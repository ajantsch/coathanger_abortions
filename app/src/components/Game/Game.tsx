import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

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

  render = () => {
    return <>{this.state.gameId}</>;
  };
}

export default withRouter(Game);
