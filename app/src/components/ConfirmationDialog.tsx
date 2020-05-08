import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

interface IConfirmDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
}
class ConfirmDialog extends React.PureComponent<IConfirmDialogProps, {}> {
  handleCloseConfirm = () => {
    this.props.onClose(true);
  };

  handleCloseCancel = () => {
    this.props.onClose(false);
  };

  render = () => {
    return (
      <Dialog
        open={this.props.open}
        keepMounted
        onClose={this.handleCloseCancel}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">You already want to leave?</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Coathanger Abortions can be tough, let&apos;s hope it didn&apos;t break your faith in humanity.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseCancel} color="primary">
            Back to the game
          </Button>
          <Button onClick={this.handleCloseConfirm} variant="contained" color="primary">
            Leave game
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default ConfirmDialog;
