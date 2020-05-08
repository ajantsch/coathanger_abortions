import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps, Redirect } from "react-router";

import actions from "../actions";
import { AppState } from "../reducers";

import EnterGame from "./EnterGame";
import PlayGame from "./PlayGame";

const mapStateToProps = (state: AppState) => ({
  status: state.status,
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      getGame: actions.getGame,
      getPlayer: actions.getPlayer,
    },
    dispatch,
  );

type GameManagerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ game_id: string }>;

class GameManager extends React.Component<GameManagerProps> {
  componentDidMount = async () => {
    if (!this.props.status.gameLoaded) {
      this.props.getGame(this.props.match.params.game_id);
    }
    if (!this.props.status.playerLoaded) {
      this.props.getPlayer(this.props.match.params.game_id);
    }
  };

  render = () => {
    return this.props.status.gameLoaded ? (
      this.props.game ? (
        this.props.status.playerLoaded ? (
          this.props.player ? (
            <PlayGame />
          ) : (
            <EnterGame />
          )
        ) : (
          <></>
        )
      ) : (
        <Redirect to={`/`} />
      )
    ) : (
      <></>
    );
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameManager));
