import React from "react";
import { Button, Typography } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { GameApi } from "../services/api";
import { GameSocket } from "../services/sockets";
import { IPlayer, ICard, IGivenAnswer } from "../services/api/game";

import Enter from "./Enter";
import Players from "./Players";
import Card from "./Card";
import CardStack from "./CardStack";
import Round from "./Round";

interface IGameState {
  gameId: string | undefined;
  player: IPlayer | undefined;
  players: Omit<IPlayer, "activeCards">[];
  czar: string | undefined;
  activeCards: {
    question: ICard | undefined;
    answers: { player: string; card: ICard }[];
  };
  gameSocket: SocketIOClient.Socket | undefined;
}

const DEFAULT_STATE: IGameState = {
  gameId: undefined,
  player: undefined,
  players: [],
  czar: undefined,
  activeCards: {
    question: undefined,
    answers: [],
  },
  gameSocket: undefined,
};

class Game extends React.Component<RouteComponentProps<{ game_id: string }>, IGameState> {
  constructor(props: RouteComponentProps<{ game_id: string }>) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  connectGameSocket = async (gameId: string, playerName: string): Promise<SocketIOClient.Socket> => {
    const gameSocket = await GameSocket.connectToGame(gameId, playerName);

    gameSocket.on("player_joined", (player: { id: string; name: string }) => {
      console.warn("Player joined:", player);
      this.setState({
        players: [...this.state.players, { ...player, wonCards: [] }],
      });
    });

    gameSocket.on("czar_set", (playerId: string) => {
      console.warn("Czar set:", playerId);
      this.setState({ czar: playerId });
    });

    gameSocket.on("question_card_drawn", (card: ICard) => {
      console.warn("Question card drawn:", card);
      this.setState({
        activeCards: { ...this.state.activeCards, question: card },
      });
    });

    gameSocket.on("answer_card_given", (answer: IGivenAnswer) => {
      console.warn("Answer card given:", answer);
      this.setState({
        activeCards: { ...this.state.activeCards, answers: [...this.state.activeCards.answers, answer] },
      });
    });

    gameSocket.on("round_finished", (winner: IGivenAnswer) => {
      console.warn("Winner of the round:", winner);
      const playerIndex = this.state.players.map(player => player.id).indexOf(winner.player);
      const players = [...this.state.players];
      const updatedPlayer = this.state.players[playerIndex];
      updatedPlayer.wonCards = [...updatedPlayer.wonCards, winner.card];
      players[playerIndex] = updatedPlayer;
      if (playerIndex >= 0) {
        this.setState({ players });
      }
      if (this.state.player) {
        if (winner.player === this.state.player.id) {
          console.warn("YOU HAVE WON!");
        }
      }
    });

    return gameSocket;
  };

  handleGameEntered = async (player: IPlayer) => {
    if (!this.state.gameId) {
      return;
    }
    try {
      sessionStorage.setItem(`chg_${this.state.gameId}`, player.id);
      const game = await GameApi.getGame(this.state.gameId);
      this.setState({
        player,
        czar: game.czar,
        players: [...this.state.players, { id: player.id, name: player.name, wonCards: player.wonCards }],
        gameSocket: await this.connectGameSocket(this.state.gameId, player.name),
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleDrawQuestionCard = async () => {
    if (
      !this.state.gameId ||
      !this.state.player ||
      this.state.czar !== this.state.player.id ||
      this.state.activeCards.question
    ) {
      return;
    }
    const activeQuestionCard = await GameApi.drawQuestionCard(this.state.gameId);
    this.setState({
      activeCards: { ...this.state.activeCards, question: activeQuestionCard },
    });
  };

  handleAnswerCardSelected = async (card: ICard) => {
    if (!this.state.gameId || !this.state.player) {
      return;
    }

    try {
      const selectedCard = await GameApi.selectAnswerCard(this.state.gameId, this.state.player.id, card);
      const playerCards = [...this.state.player.activeCards];
      playerCards.splice(this.state.player.activeCards.map(card => card.id).indexOf(selectedCard.id), 1);
      this.setState({
        player: { ...this.state.player, activeCards: playerCards },
      });
    } catch (e) {}
  };

  handleRoundWinnerSelected = async (winner: IGivenAnswer) => {
    if (!this.state.gameId || !this.state.player) {
      return;
    }

    try {
      await GameApi.selectRoundWinner(this.state.gameId, this.state.player.id, winner);
    } catch (e) {}
  };

  componentDidMount = async () => {
    try {
      const game = await GameApi.getGame(this.props.match.params.game_id);
      if (game) {
        const state: IGameState = {
          ...DEFAULT_STATE,
          gameId: game.id,
          players: game.players,
          czar: game.czar,
          activeCards: game.activeCards,
        };
        const previousPlayerId = window.sessionStorage.getItem(`chg_${game.id}`);
        if (previousPlayerId && game.players.map(player => player.id).includes(previousPlayerId)) {
          state.player = await GameApi.getGamePlayer(game.id, previousPlayerId);

          state.gameSocket = await this.connectGameSocket(
            game.id,
            game.players.filter(player => player.id === previousPlayerId)[0].name,
          );
        }
        this.setState(state);
      }
    } catch (e) {
      this.props.history.push("/");
    }
  };

  render = () => {
    return (
      <>
        {!this.state.player && this.state.gameId && (
          <Enter gameId={this.state.gameId} gameEnteredCallback={this.handleGameEntered} />
        )}
        {this.state.player && this.state.gameId && (
          <>
            {this.state.czar === this.state.player.id && !this.state.activeCards.question && (
              <Button variant="contained" color="primary" onClick={this.handleDrawQuestionCard}>
                Draw question card
              </Button>
            )}
            <Round
              question={this.state.activeCards.question}
              answers={this.state.activeCards.answers}
              answersVisible={this.state.activeCards.answers.length >= this.state.players.length - 1}
              winnerSelected={this.handleRoundWinnerSelected}
            />
            <Typography variant="h5">Your cards</Typography>
            <CardStack cards={this.state.player.activeCards} onCardClick={this.handleAnswerCardSelected} />
            <Players players={this.state.players} czar={this.state.czar} />
          </>
        )}
      </>
    );
  };
}

export default withRouter(Game);
