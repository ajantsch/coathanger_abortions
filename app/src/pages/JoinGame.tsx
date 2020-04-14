import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

import JoinGameForm from "../components/JoinGameForm";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ joinGame: actions.joinGame }, dispatch);

class JoinGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps
> {
  handleJoinGame = async (name: string) => {
    this.props.joinGame(name);
  };

  componentDidMount = () => {
    if (!this.props.game.id) {
      this.props.history.push("/");
    }
  };

  render = () => {
    return <JoinGameForm onFormSubmit={this.handleJoinGame} />;
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinGame));
