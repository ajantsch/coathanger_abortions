import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

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
        <NameTextField
          type="text"
          id="name"
          label="Your Name"
          variant="outlined"
          value={this.state.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleNameChange(event.target.value)}
          fullWidth
          required
          autoFocus
        ></NameTextField>
        <JoinGameButton type="submit" variant="contained" color="primary" disabled={!this.state.name.length}>
          Enter game
        </JoinGameButton>
      </form>
    );
  };
}

const NameTextField: AnyStyledComponent = styled(TextField)`
  && {
    background: #f3f3f4;
  }
`;

const JoinGameButton: AnyStyledComponent = styled(Button)`
  && {
    display: block;
    width: 100%;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 2rem auto;
    padding: 0.7rem 2rem;

    &:disabled {
      background: #f3f3f4;
      color: #1c1c1c;
      box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.23);
    }
  }
`;

export default JoinGameForm;
