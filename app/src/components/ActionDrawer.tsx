import React from "react";
import { Drawer } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface IActionDrawerProps {
  open: boolean;
}

class ActionDrawer extends React.PureComponent<IActionDrawerProps, {}> {
  render = () => {
    return (
      <Drawer anchor="bottom" open={this.props.open}>
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

export default ActionDrawer;
