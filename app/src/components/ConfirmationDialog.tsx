import React from "react";
import { Dialog, DialogProps, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ConfirmDialog extends React.PureComponent<DialogProps, {}> {
  render = () => {
    return (
      <Dialog
        {...{
          ...this.props,
          "aria-labelledby": "confirm-dialog-title",
          "aria-describedby": "confirm-dialog-description",
          TransitionComponent: Transition,
        }}
      >
        {this.props.children}
      </Dialog>
    );
  };
}

export default ConfirmDialog;
