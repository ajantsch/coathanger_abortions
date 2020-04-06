import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { GameService } from "../../services";

import Enter from "./Enter";

interface IGameState {
  gameId: string | undefined;
  playerId: string | undefined;
  players: Map<string, string>;
}

const DEFAULT_STATE: IGameState = {
  gameId: undefined,
  playerId: undefined,
  players: new Map<string, string>(),
};

class Game extends React.Component<
  RouteComponentProps<{ game_id: string }>,
  IGameState
> {
  constructor(props: RouteComponentProps<{ game_id: string }>) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleGameEntered = (playerId: string, playerName: string) => {
    sessionStorage.setItem(`chg_${this.state.gameId}`, playerId);
    this.setState({
      playerId,
      players: this.state.players.set(playerId, playerName),
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
        };
        const previousPlayerId = window.sessionStorage.getItem(
          `chg_${game.id}`,
        );
        if (previousPlayerId) {
          state.playerId = previousPlayerId;
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
        {this.state.playerId &&
          this.state.gameId &&
          Array.from(this.state.players).map(player => {
            return <p key={player[0]}>{player[1]}</p>;
          })}
      </>
    );
  };
}

export default withRouter(Game);
