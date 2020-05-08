import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps, Redirect } from "react-router";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

import JoinLayout from "../components/JoinLayout";
import CreateGameForm from "../components/CreateGameForm";
import JoinGameFrom from "../components/JoinGameForm";
import Separator from "../components/Separator";

const mapStateToProps = (state: AppState) => ({
  status: state.status,
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    { resetGame: actions.resetGame, startGame: actions.startGame, getGame: actions.getGame },
    dispatch,
  );

class NewGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps
> {
  handleCreateGame = () => {
    this.props.startGame();
  };

  handleJoinGame = (gameId: string) => {
    this.props.getGame(gameId);
  };

  componentDidMount = () => {
    this.props.resetGame();
  };

  render = () => {
    return this.props.status.gameLoaded && this.props.game ? (
      <Redirect to={`/${this.props.game.id}`} />
    ) : (
      <JoinLayout>
        <CreateGameForm onFormSubmit={this.handleCreateGame} />
        <StyledSeparator text="or" />
        <JoinGameFrom onFormSubmit={this.handleJoinGame} />
      </JoinLayout>
    );
  };
}

const StyledSeparator: AnyStyledComponent = styled(Separator)`
  && {
    margin: 1rem 2rem;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGame));
