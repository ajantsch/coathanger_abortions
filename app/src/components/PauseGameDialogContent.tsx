import React from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Hotel, Bathtub, SmokingRooms } from "@material-ui/icons";
import styled, { AnyStyledComponent } from "styled-components";

interface IPauseGameDialogContentProps {
  onClickConfirm: () => void;
}

class PauseGameDialogContent extends React.PureComponent<IPauseGameDialogContentProps> {
  render = () => {
    return (
      <>
        <DialogTitle id="confirm-dialog-title">You&apos;re taking a break</DialogTitle>
        <DialogContent>
          <DialogIcons>
            <IconWrapper>
              <SmokingRooms fontSize="large" titleAccess="Smoking" />
            </IconWrapper>
            <IconWrapper>
              <Bathtub fontSize="large" titleAccess="Bathtub" />
            </IconWrapper>
            <IconWrapper>
              <Hotel fontSize="large" titleAccess="Bed" />
            </IconWrapper>
          </DialogIcons>
          <DialogContentText id="confirm-dialog-description">
            Take a few minutes, digest the terrible things you had to endure, and maybe even reflect on your terrible
            life choices. When you feel ready, join your buddies again.
            <br />
            <br />
            While you are taking your break, any card you have alreay put into the round will not be considered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClickConfirm} variant="contained" color="primary">
            I&apos;m ready, let&apos;s play again
          </Button>
        </DialogActions>
      </>
    );
  };
}

const DialogIcons: AnyStyledComponent = styled.div`
  margin: 1rem auto;
  text-align: center;
`;

const IconWrapper: AnyStyledComponent = styled.div`
  display: inline-block;
  margin: 0 0.5rem;
`;

export default PauseGameDialogContent;
