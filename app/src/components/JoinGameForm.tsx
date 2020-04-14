import React from "react";
import { Button, TextField } from "@material-ui/core";

interface IJoinGameFormProps {
  onFormSubmit: (name: string) => void;
}

interface IEnterState {
  name: string;
}

const DEFAULT_STATE: IEnterState = {
  name: "",
};

class JoinGameForm extends React.PureComponent<IJoinGameFormProps, IEnterState> {
  constructor(props: IJoinGameFormProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleNameChange = (value: string) => {
    this.setState({ name: value });
  };

  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.name);
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

export default JoinGameForm;
