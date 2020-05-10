import React from "react";
import { connect } from "react-redux";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import { playerIsRoundWinner, getRoundWinnerName } from "../selectors";

import CardCombo from "../components/CardCombo";
import SlideUpTransition from "../components/SlideUpTransition";

const mapStateToProps = (state: AppState) => ({
  round: state.round,
  playerIsRoundWinner: playerIsRoundWinner(state),
  roundWinnerName: getRoundWinnerName(state),
});

class WinnerDialog extends React.PureComponent<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return (
      <Dialog
        open={!!this.props.round?.winner && !this.props.playerIsRoundWinner}
        {...{
          "aria-labelledby": "winner-dialog-title",
          "aria-describedby": "winner-dialog-description",
          TransitionComponent: SlideUpTransition,
        }}
      >
        <DialogTitle id="winner-dialog-title">We have a winner!</DialogTitle>
        <WinnerDialogContent>
          <DialogContentText id="winner-dialog-description">
            {this.props.roundWinnerName} had the best answer this round and will now lead the next round as czar. The
            next round should start shortly.
          </DialogContentText>
          {!!this.props.round && !!this.props.round.question && !!this.props.round.winner && (
            <WinnerDialogContentCentered>
              <WinnerDialogCardCombo
                {...{ question: this.props.round.question, answer: this.props.round.winner.card }}
              />
            </WinnerDialogContentCentered>
          )}
        </WinnerDialogContent>
      </Dialog>
    );
  };
}

const WinnerDialogContent: AnyStyledComponent = styled(DialogContent)`
  && {
    padding: 8px 20px 20px;
  }
`;

const WinnerDialogContentCentered: AnyStyledComponent = styled.div`
  text-align: center;
`;

const WinnerDialogCardCombo: AnyStyledComponent = styled(CardCombo)`
  && {
    margin-top: 1rem;
  }
`;

export default connect(mapStateToProps)(WinnerDialog);
