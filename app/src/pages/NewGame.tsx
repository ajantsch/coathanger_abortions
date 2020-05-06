import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ startGame: actions.startGame }, dispatch);

class NewGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps
> {
  handleCreateGame = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.startGame();
  };

  componentDidUpdate = () => {
    if (this.props.game) {
      if (!this.props.player) {
        return this.props.history.push(`/${this.props.game.id}/join`);
      }
      return this.props.history.push(`/${this.props.game.id}`);
    }
  };

  render = () => {
    return (
      <form onSubmit={this.handleCreateGame}>
        <StartGameButton type="submit" variant="contained" color="primary">
          Start a game
        </StartGameButton>
      </form>
    );
  };
}

const StartGameButton: AnyStyledComponent = styled(Button)`
  && {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 2rem auto;
    padding: 1rem 3rem;

    @media (min-width: 960px) {
      font-size: 1.6rem;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGame));
