import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

import JoinLayout from "../components/JoinLayout";
import CreateGameForm from "../components/CreateGameForm";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ startGame: actions.startGame }, dispatch);

class NewGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps
> {
  handleCreateGame = () => {
    this.props.startGame();
  };

  routeGuard = () => {
    if (this.props.game) {
      if (!this.props.player) {
        return this.props.history.push(`/${this.props.game.id}/join`);
      }
      return this.props.history.push(`/${this.props.game.id}`);
    }
  };

  componentDidUpdate = () => {
    this.routeGuard();
  };

  componentDidMount = () => {
    if (this.props.game) {
      if (!this.props.player) {
        return this.props.history.push(`/${this.props.game.id}/join`);
      }
      return this.props.history.push(`/${this.props.game.id}`);
    }
  };

  render = () => {
    return (
      <JoinLayout>
        <CreateGameForm onFormSubmit={this.handleCreateGame} />
      </JoinLayout>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGame));
