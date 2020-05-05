import React from "react";
import { Button, Typography } from "@material-ui/core";

interface IStartNewRoundProps {
  onClickStart: () => void;
}

class StartNewRound extends React.PureComponent<IStartNewRoundProps, {}> {
  handleStart = () => {
    this.props.onClickStart();
  };

  render = () => {
    return (
      <>
        <Typography variant="h6">Congratulations!</Typography>
        <Typography variant="body1">
          You did it! You won this round. Now it&apos;s up to you to lead the next round as czar.
        </Typography>
        <br />
        <Button variant="contained" color="primary" onClick={this.handleStart}>
          Start next round
        </Button>
      </>
    );
  };
}

export default StartNewRound;
