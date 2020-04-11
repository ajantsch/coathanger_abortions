import React from "react";
import { Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { GameApi } from "../services/api";
import { GameSocket } from "../services/sockets";
import { IPlayer, ICard } from "../services/api/game";

import Enter from "./Enter";
import Players from "./Players";
import Card from "./Card";
import PlayerCards from "./PlayerCards";

interface IGameState {
  gameId: string | undefined;
  player: IPlayer | undefined;
  players: { id: string; name: string }[];
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

class Game extends React.Component<
  RouteComponentProps<{ game_id: string }>,
  IGameState
> {
  constructor(props: RouteComponentProps<{ game_id: string }>) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  connectGameSocket = async (
    gameId: string,
    playerName: string,
  ): Promise<SocketIOClient.Socket> => {
    const gameSocket = await GameSocket.connectToGame(gameId, playerName);

    gameSocket.on("player_joined", (player: { id: string; name: string }) => {
      console.warn("Player joined:", player);
      this.setState({
        players: [...this.state.players, player],
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

    gameSocket.on("answer_card_given", (card: ICard) => {
      console.warn("Answer card given:", card);
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
        players: [...this.state.players, { id: player.id, name: player.name }],
        gameSocket: await this.connectGameSocket(
          this.state.gameId,
          player.name,
        ),
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
    const activeQuestionCard = await GameApi.drawQuestionCard(
      this.state.gameId,
    );
    this.setState({
      activeCards: { ...this.state.activeCards, question: activeQuestionCard },
    });
  };

  handleAnswerCardSelected = (card: ICard) => {
    if (!this.state.player) {
      return;
    }
    const playerCards = [...this.state.player.activeCards];
    playerCards.splice(
      this.state.player.activeCards.map(card => card.id).indexOf(card.id),
      1,
    );
    this.setState({
      player: { ...this.state.player, activeCards: playerCards },
    });
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
        const previousPlayerId = window.sessionStorage.getItem(
          `chg_${game.id}`,
        );
        if (
          previousPlayerId &&
          game.players.map(player => player.id).includes(previousPlayerId)
        ) {
          state.player = await GameApi.getGamePlayer(game.id, previousPlayerId);

          state.gameSocket = await this.connectGameSocket(
            game.id,
            game.players.filter(player => player.id === previousPlayerId)[0]
              .name,
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
          <Enter
            gameId={this.state.gameId}
            gameEnteredCallback={this.handleGameEntered}
          />
        )}
        {this.state.player && this.state.gameId && (
          <>
            <Players players={this.state.players} czar={this.state.czar} />
            <PlayerCards
              gameId={this.state.gameId}
              playerId={this.state.player.id}
              cards={this.state.player.activeCards}
              cardSelectedCallback={this.handleAnswerCardSelected}
            />
            {this.state.activeCards.question && (
              <Card
                id={this.state.activeCards.question.id}
                type="question"
                content={this.state.activeCards.question.content}
              />
            )}
            {this.state.czar === this.state.player.id &&
              !this.state.activeCards.question && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleDrawQuestionCard}
                >
                  Draw question card
                </Button>
              )}
          </>
        )}
      </>
    );
  };
}

export default withRouter(Game);
