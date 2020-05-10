import React from "react";
import { Dialog, DialogProps } from "@material-ui/core";

import SlideUpTransition from "./SlideUpTransition";

class ConfirmDialog extends React.PureComponent<DialogProps, {}> {
  render = () => {
    return (
      <Dialog
        {...{
          ...this.props,
          "aria-labelledby": "confirm-dialog-title",
          "aria-describedby": "confirm-dialog-description",
          TransitionComponent: SlideUpTransition,
        }}
      >
        {this.props.children}
      </Dialog>
    );
  };
}

export default ConfirmDialog;
