import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Button, Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      startRound: actions.startNewRound,
    },
    dispatch,
  );

class StartGame extends React.PureComponent<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleStartPlaying = () => {
    this.props.startRound();
  };

  render = () => {
    return (
      <ButtonBox>
        <StartGameButton variant="contained" color="primary" onClick={this.handleStartPlaying}>
          Start playing
        </StartGameButton>
      </ButtonBox>
    );
  };
}

const ButtonBox: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
    height: 400px;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const StartGameButton: AnyStyledComponent = styled(Button)`
  && {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 2rem auto;
    padding: 0.7rem 2rem;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
