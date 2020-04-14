import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

import CreateGameForm from "../components/CreateGameForm";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ startGame: actions.startGame }, dispatch);

class NewGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps
> {
  handleCreateGame = () => {
    this.props.startGame();
  };

  componentDidUpdate = () => {
    if (this.props.game.id) {
      this.props.history.push(`/${this.props.game.id}`);
    }
  };

  componentDidMount = () => {
    if (this.props.game.id) {
      this.props.history.push(`/${this.props.game.id}`);
    }
  };

  render = () => {
    return <CreateGameForm onFormSubmit={this.handleCreateGame} />;
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGame));
