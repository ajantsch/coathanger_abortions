import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

import JoinLayout from "../components/JoinLayout";
import EnterGameForm from "../components/EnterGameForm";

const mapStateToProps = (state: AppState) => ({
  status: state.status,
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      joinGame: actions.joinGame,
    },
    dispatch,
  );

class EnterGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>
> {
  handleEnterGame = async (name: string) => {
    if (this.props.game) {
      this.props.joinGame(this.props.game.id, name);
    }
  };

  render = () => {
    return (
      <JoinLayout>
        <EnterGameForm onFormSubmit={this.handleEnterGame} />
      </JoinLayout>
    );
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterGame));
