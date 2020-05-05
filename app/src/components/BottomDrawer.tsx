import React from "react";
import { SwipeableDrawer } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface IBottomDrawerProps {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

class BottomDrawer extends React.PureComponent<IBottomDrawerProps, {}> {
  showDrawer = () => {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  hideDrawer = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render = () => {
    return (
      <SwipeableDrawer anchor="bottom" open={this.props.open} onOpen={this.showDrawer} onClose={this.hideDrawer}>
        <DrawerContent>{this.props.children}</DrawerContent>
      </SwipeableDrawer>
    );
  };
}

const DrawerContent: AnyStyledComponent = styled.div`
  && {
    padding-bottom: 20px;
  }
`;

export default BottomDrawer;
