import React from "react";
import { Button, Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface IStartGameProps {
  onClickStart: () => void;
}

class StartGame extends React.PureComponent<IStartGameProps, {}> {
  handleStartPlaying = () => {
    this.props.onClickStart();
  };

  render = () => {
    return (
      <ButtonBox>
        <StartGameButton variant="contained" color="primary" onClick={this.handleStartPlaying}>
          Start playing
        </StartGameButton>
      </ButtonBox>
    );
  };
}

const ButtonBox: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
    height: 400px;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const StartGameButton: AnyStyledComponent = styled(Button)`
  && {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 2rem auto;
    padding: 0.7rem 2rem;
  }
`;

export default StartGame;
