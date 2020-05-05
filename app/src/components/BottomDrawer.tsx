import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface IBottomDrawerProps {
  open: boolean;
  onClick: () => void;
}

class BottomDrawer extends React.PureComponent<IBottomDrawerProps, {}> {
  hideDrawer = () => {
    this.props.onClick();
  };

  render = () => {
    return (
      <Drawer anchor="bottom" variant="temporary" open={this.props.open} onClick={this.hideDrawer}>
        <DrawerContent>{this.props.children}</DrawerContent>
      </Drawer>
    );
  };
}

const DrawerContent: AnyStyledComponent = styled.div`
  && {
    padding-bottom: 20px;
  }
`;

export default BottomDrawer;
