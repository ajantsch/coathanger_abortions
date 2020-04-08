import React from "react";
import { Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { GameService } from "../services";

class Create extends React.PureComponent<RouteComponentProps, {}> {
  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const game = await GameService.createGame();
    if (game) {
      this.props.history.push(`/${game.id}`);
    }
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

export default withRouter(Create);
