import React from "react";
import { Button, TextField } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { GameService } from "../../services";

interface IStartState {
  name: string;
}

const DEFAULT_STATE: IStartState = {
  name: "",
};

class Start extends React.PureComponent<RouteComponentProps, IStartState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleNameChange = (value: string) => {
    this.setState({ name: value });
  };

  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const game = await GameService.startGame();
    if (game) {
      const player = await GameService.addGamePlayer(game.id, this.state.name);
      if (player) {
        this.props.history.push(`/${game.id}`);
      }
    }
  };

  render = () => {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <TextField
          type="text"
          id="name"
          label="Your Name"
          value={this.state.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.handleNameChange(event.target.value)
          }
          fullWidth
          required
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!this.state.name.length}
        >
          Start new game
        </Button>
      </form>
    );
  };
}

export default withRouter(Start);
