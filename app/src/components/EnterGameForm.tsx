import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";

interface IEnterGameFormProps {
  onFormSubmit: (name: string) => void;
}

interface IEnterState {
  name: string;
}

const DEFAULT_STATE: IEnterState = {
  name: "",
};

class EnterGameForm extends React.PureComponent<IEnterGameFormProps, IEnterState> {
  constructor(props: IEnterGameFormProps) {
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
        <EnterGameButton type="submit" variant="contained" color="primary" disabled={!this.state.name.length}>
          Enter game
        </EnterGameButton>
      </form>
    );
  };
}

const NameTextField: AnyStyledComponent = styled(TextField)`
  && {
    background: ${colors.light};
  }
`;

const EnterGameButton: AnyStyledComponent = styled(Button)`
  && {
    display: block;
    width: 100%;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 2rem auto;
    padding: 0.7rem 2rem;

    &:disabled {
      background: ${colors.light};
      color: ${colors.dark};
      box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.23);
    }
  }
`;

export default EnterGameForm;
