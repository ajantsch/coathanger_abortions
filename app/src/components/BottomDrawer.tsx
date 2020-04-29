import React from "react";
import { Container, Drawer } from "@material-ui/core";
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
      <Drawer
        anchor="bottom"
        variant="temporary"
        open={this.props.open}
        onClick={this.hideDrawer}
        PaperProps={{ color: "secondary", style: { padding: "25px" } }}
        ModalProps={{ hideBackdrop: true }}
      >
        <DrawerContent>
          <Container maxWidth="sm">{this.props.children}</Container>
        </DrawerContent>
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
