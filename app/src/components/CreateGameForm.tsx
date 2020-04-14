import React from "react";
import { Button } from "@material-ui/core";

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
        <Button type="submit" variant="contained" color="primary">
          Create new game
        </Button>
      </form>
    );
  };
}

export default CreateGameForm;
