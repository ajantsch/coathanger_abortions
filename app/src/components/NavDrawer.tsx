import React from "react";
import { Drawer } from "@material-ui/core";

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
        {this.props.children}
      </Drawer>
    );
  };
}

export default NavDrawer;
