import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Drawer, Container } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";
import { playerIsRoundWinner, shouldShowRevealAnswerAction } from "../selectors";

import RevealAnswers from "../components/RevealAnswers";
import StartNewRound from "../components/StartNewRound";

const mapStateToProps = (state: AppState) => ({
  round: state.round,
  playerIsRoundWinner: playerIsRoundWinner(state),
  shouldShowRevealAnswerAction: shouldShowRevealAnswerAction(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      startRound: actions.startNewRound,
      revealAnswers: actions.revealAnswers,
    },
    dispatch,
  );

class ActionDrawer extends React.PureComponent<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleRevealAnswers = () => {
    this.props.revealAnswers();
  };

  handleStartRound = () => {
    this.props.startRound();
  };

  render = () => {
    const drawerOpen = this.props.shouldShowRevealAnswerAction || this.props.playerIsRoundWinner;
    return (
      <Drawer anchor="bottom" open={drawerOpen} ModalProps={{ hideBackdrop: true }}>
        <DrawerContent maxWidth="sm">
          {this.props.shouldShowRevealAnswerAction && <RevealAnswers onClickReveal={this.handleRevealAnswers} />}
          {this.props.playerIsRoundWinner && <StartNewRound onClickStart={this.handleStartRound} />}
        </DrawerContent>
      </Drawer>
    );
  };
}

const DrawerContent: AnyStyledComponent = styled(Container)`
  && {
    padding-top: 20px;
    padding-bottom: 25px;

    @media (min-width: 600px) {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ActionDrawer);
