import React from "react";
import { Button, Typography } from "@material-ui/core";

interface IRevealAnswersProps {
  onClickReveal: () => void;
}

class RevealAnswers extends React.PureComponent<IRevealAnswersProps, {}> {
  handleRevealAnsers = () => {
    this.props.onClickReveal();
  };

  render = () => {
    return (
      <>
        <Typography variant="body1">
          All the players have placed their answers, now it&apos;s time to reveal what terrible choices they made!
        </Typography>
        <br />
        <Button variant="contained" color="primary" onClick={this.handleRevealAnsers}>
          Reveal answers
        </Button>
      </>
    );
  };
}

export default RevealAnswers;
