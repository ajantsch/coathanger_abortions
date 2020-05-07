import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface INavDrawerProps {
  open: boolean;
  onClick: () => void;
}

class NavDrawer extends React.PureComponent<INavDrawerProps, {}> {
  hideDrawer = () => {
    this.props.onClick();
  };

  render = () => {
    return (
      <Drawer
        anchor="bottom"
        variant="temporary"
        ModalProps={{ hideBackdrop: true }}
        open={this.props.open}
        onClick={this.hideDrawer}
      >
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

export default NavDrawer;
