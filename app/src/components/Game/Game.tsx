import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { GameService } from "../../services";

interface IGameState {
  gameId: string;
}

class Game extends React.Component<
  RouteComponentProps<{ game_id: string }>,
  IGameState
> {
  constructor(props: RouteComponentProps<{ game_id: string }>) {
    super(props);
    this.state = { gameId: props.match.params.game_id };
  }

  componentDidMount = async () => {
    try {
      await GameService.getGame(this.state.gameId);
    } catch (e) {
      this.props.history.push("/");
    }
  };

  render = () => {
    return <>{this.state.gameId}</>;
  };
}

export default withRouter(Game);
