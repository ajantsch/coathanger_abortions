import React from "react";
import { connect } from "react-redux";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import { playerIsRoundWinner, getRoundWinnerName } from "../selectors";

import CardCombo from "../components/CardCombo";

const mapStateToProps = (state: AppState) => ({
  round: state.round,
  playerIsRoundWinner: playerIsRoundWinner(state),
  roundWinnerName: getRoundWinnerName(state),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class WinnerDialog extends React.PureComponent<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return (
      <Dialog
        open={!!this.props.round?.winner && !this.props.playerIsRoundWinner}
        {...{
          "aria-labelledby": "winner-dialog-title",
          "aria-describedby": "winner-dialog-description",
          TransitionComponent: Transition,
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
