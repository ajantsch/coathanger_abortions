import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

import CreateGameForm from "../components/CreateGameForm";
import JoinGameFrom from "../components/JoinGameForm";
import Separator from "../components/Separator";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ startGame: actions.startGame, getGame: actions.getGame }, dispatch);

class NewGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps
> {
  handleCreateGame = () => {
    this.props.startGame();
  };

  handleJoinGame = (gameId: string) => {
    this.props.getGame(gameId);
  };

  componentDidUpdate = () => {
    if (this.props.game) {
      return this.props.history.push(`/${this.props.game.id}`);
    }
  };

  render = () => {
    return (
      <>
        <CreateGameForm onFormSubmit={this.handleCreateGame} />
        <StyledSeparator text="or" />
        <JoinGameFrom onFormSubmit={this.handleJoinGame} />
      </>
    );
  };
}

const StyledSeparator: AnyStyledComponent = styled(Separator)`
  && {
    margin: 1rem 2rem;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGame));
