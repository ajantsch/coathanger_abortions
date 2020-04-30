import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled, { AnyStyledComponent } from "styled-components";

interface INotificationProps {
  open: boolean;
  message?: string;
  onClose?: () => void;
}

class Notification extends React.PureComponent<INotificationProps, {}> {
  handleSnackbarClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render = () => {
    return (
      <StyledSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.props.open}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        message={this.props.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    );
  };
}

const StyledSnackbar: AnyStyledComponent = styled(Snackbar)`
  && {
    bottom: 90px;
  }
`;

export default Notification;
