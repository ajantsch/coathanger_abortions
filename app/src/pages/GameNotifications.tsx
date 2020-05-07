import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

const mapStateToProps = (state: AppState) => ({
  notification: state.notification,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      hideNotification: actions.hideNotification,
    },
    dispatch,
  );

type GameNotificationsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class GameNotifications extends React.PureComponent<GameNotificationsProps, {}> {
  handleSnackbarClose = () => {
    this.props.hideNotification();
  };

  render = () => {
    return (
      <StyledSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.props.notification.visible}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        message={this.props.notification.text}
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
    bottom: 78px;

    @media (min-width: 600px) {
      bottom: 86px;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(GameNotifications);
