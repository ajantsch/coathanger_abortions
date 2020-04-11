import React from "react";
import { Button, TextField } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { GameApi } from "../services/api";
import { IPlayer } from "../services/api/game";

interface IEnterState {
  name: string;
}

interface IEnterProps extends RouteComponentProps {
  gameId: string;
  gameEnteredCallback: (player: IPlayer) => void;
}

const DEFAULT_STATE: IEnterState = {
  name: "",
};

class Enter extends React.PureComponent<IEnterProps, IEnterState> {
  constructor(props: IEnterProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleNameChange = (value: string) => {
    this.setState({ name: value });
  };

  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const player = await GameApi.addGamePlayer(this.props.gameId, this.state.name);
    if (player) {
      this.props.gameEnteredCallback(player);
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleNameChange(event.target.value)}
          fullWidth
          required
          autoFocus
        ></TextField>
        <Button type="submit" variant="contained" color="primary" disabled={!this.state.name.length}>
          Enter game
        </Button>
      </form>
    );
  };
}

export default withRouter(Enter);
