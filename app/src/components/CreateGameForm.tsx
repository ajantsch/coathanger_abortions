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
      <form onSubmit={this.handleFormSubmit}>
        <StartGameButton type="submit" variant="contained" color="primary">
          Start a game
        </StartGameButton>
      </form>
    );
  };
}

const StartGameButton: AnyStyledComponent = styled(Button)`
  && {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 2rem auto;
    padding: 1rem 3rem;

    @media (min-width: 960px) {
      font-size: 1.6rem;
    }
  }
`;

export default CreateGameForm;
