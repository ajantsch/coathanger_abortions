import React from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

interface IPauseGameDialogContentProps {
  onClickConfirm: () => void;
  onClickCancel: () => void;
}

class ExitGameDialogContent extends React.PureComponent<IPauseGameDialogContentProps> {
  render = () => {
    return (
      <>
        <DialogTitle id="confirm-dialog-title">You want to leave already?</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Coathanger Abortions can be tough, let&apos;s hope it didn&apos;t break your faith in humanity.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClickCancel} color="primary">
            Go back
          </Button>
          <Button onClick={this.props.onClickConfirm} variant="contained" color="primary">
            Leave the game
          </Button>
        </DialogActions>
      </>
    );
  };
}

export default ExitGameDialogContent;
