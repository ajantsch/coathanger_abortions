import React from "react";
import { Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";

export default React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
