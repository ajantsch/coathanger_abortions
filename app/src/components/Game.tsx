import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import io from "socket.io-client";

import { GameService } from "../services";

import Enter from "./Enter";
import Players from "./Players";

const { SOCKET_URL } = process.env;

interface IGameState {
  gameId: string | undefined;
  playerId: string | undefined;
  players: { id: string; name: string }[];
  gameSocket: SocketIOClient.Socket | undefined;
}

const DEFAULT_STATE: IGameState = {
  gameId: undefined,
  playerId: undefined,
  players: [],
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

  connectGameSocket = (
    gameId: string,
    playerName: string,
  ): SocketIOClient.Socket => {
    const gameSocket = io.connect(`${SOCKET_URL}/${gameId}`);
    gameSocket.on("connect", () => {
      gameSocket.emit(
        "player_connected",
        `Player ${playerName} now has a socket connection to game ${gameId}`,
      );
      gameSocket.on(
        "player_joined_game",
        (player: { id: string; name: string }) => {
          this.setState({
            players: [...this.state.players, player],
          });
        },
      );
    });
    return gameSocket;
  };

  handleGameEntered = (player: { id: string; name: string }) => {
    if (!this.state.gameId) {
      return;
    }
    sessionStorage.setItem(`chg_${this.state.gameId}`, player.id);
    this.setState({
      playerId: player.id,
      players: [...this.state.players, player],
      gameSocket: this.connectGameSocket(this.state.gameId, player.name),
    });
  };

  componentDidMount = async () => {
    try {
      const game = await GameService.getGame(this.props.match.params.game_id);
      if (game) {
        const state: IGameState = {
          gameId: game.id,
          playerId: undefined,
          players: game.players,
          gameSocket: undefined,
        };
        const previousPlayerId = window.sessionStorage.getItem(
          `chg_${game.id}`,
        );
        if (
          previousPlayerId &&
          !!game.players.filter(player => player.id === previousPlayerId).length
        ) {
          state.playerId = previousPlayerId;

          state.gameSocket = this.connectGameSocket(
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
        {!this.state.playerId && this.state.gameId && (
          <Enter
            gameId={this.state.gameId}
            gameEnteredCallback={this.handleGameEntered}
          />
        )}
        {this.state.playerId && this.state.gameId && (
          <Players players={this.state.players} />
        )}
      </>
    );
  };
}

export default withRouter(Game);
