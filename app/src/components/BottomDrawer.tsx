import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface IBottomDrawerProps {
  open: boolean;
  onClick: () => void;
}

class BottomDrawer extends React.Component<IBottomDrawerProps, {}> {
  hideDrawer = () => {
    this.props.onClick();
  };

  render = () => {
    return (
      <Drawer
        anchor="bottom"
        variant="temporary"
        open={this.props.open}
        onClick={this.hideDrawer}
        PaperProps={{ color: "secondary", style: { margin: "0 auto", padding: "25px", maxWidth: "600px" } }}
        ModalProps={{ hideBackdrop: true }}
      >
        <DrawerContent>{this.props.children}</DrawerContent>
      </Drawer>
    );
  };
}

const DrawerContent: AnyStyledComponent = styled.div`
  && {
    padding-bottom: 66px;
  }
`;

export default BottomDrawer;
