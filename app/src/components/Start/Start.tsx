import React from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

const { API_BASE_URL } = process.env;

interface IStartState {
  name: string;
}

const DEFAULT_STATE: IStartState = {
  name: "",
};

class Start extends React.PureComponent<{}, IStartState> {
  constructor(props: {}) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleStartGame = () => {
    axios.post(`${API_BASE_URL}/games`);
  };

  render = () => {
    return (
      <>
        <TextField placeholder="Your Name"></TextField>
        <Button variant="contained" onClick={this.handleStartGame}>
          Start new game
        </Button>
      </>
    );
  };
}

export default Start;
