import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";

interface IJoinGameFormProps {
  onFormSubmit: (gameId: string) => void;
}

interface IJoinGameFormState {
  gameId: string;
}

const DEFAULT_STATE: IJoinGameFormState = {
  gameId: "",
};

class JoinGameForm extends React.PureComponent<IJoinGameFormProps, IJoinGameFormState> {
  constructor(props: IJoinGameFormProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleGamecodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ gameId: event.target.value });
  };

  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.gameId);
  };

  render = () => {
    return (
      <JoinGameFormRoot onSubmit={this.handleFormSubmit}>
        <NameTextField
          type="text"
          id="gamecode"
          label="Game Code"
          placeholder="e.g. r8bl2"
          variant="outlined"
          value={this.state.gameId}
          onChange={this.handleGamecodeChange}
          fullWidth
          required
          autoFocus
        ></NameTextField>
        <EnterGameButton type="submit" variant="contained" color="primary" disabled={this.state.gameId.length < 6}>
          Join game
        </EnterGameButton>
      </JoinGameFormRoot>
    );
  };
}

const JoinGameFormRoot: AnyStyledComponent = styled.form`
  margin: 0 2rem;
  text-align: center;
`;

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
    padding: 0.7rem 1rem;
    margin: 1rem 0 0 0;

    &:disabled {
      opacity: 0.7;
      background: ${colors.dark};
      color: ${colors.light};
      box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.23);
    }
  }
`;

export default JoinGameForm;
