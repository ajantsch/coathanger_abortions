import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ startGame: actions.startGame }, dispatch);

class Create extends React.PureComponent<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps,
  {}
> {
  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.startGame();
  };

  componentDidUpdate = () => {
    if (this.props.game.id) {
      this.props.history.push(`/${this.props.game.id}`);
    }
  };

  componentDidMount = () => {
    if (this.props.game.id) {
      this.props.history.push(`/${this.props.game.id}`);
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create));
