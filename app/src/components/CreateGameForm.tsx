import React from "react";
import { Button } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface ICreateGameFormProps {
  onFormSubmit: () => void;
}

class CreateGameForm extends React.PureComponent<ICreateGameFormProps> {
  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onFormSubmit();
  };

  render = () => {
    return (
      <CreateGameFormRoot onSubmit={this.handleFormSubmit}>
        <CreateGameButton type="submit" variant="contained" color="primary">
          Start a game
        </CreateGameButton>
      </CreateGameFormRoot>
    );
  };
}

const CreateGameFormRoot: AnyStyledComponent = styled.form`
  margin: 0 2rem;
  text-align: center;
`;

const CreateGameButton: AnyStyledComponent = styled(Button)`
  && {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem;
    width: 100%;

    @media (min-width: 960px) {
      font-size: 1.6rem;
    }
  }
`;

export default CreateGameForm;
