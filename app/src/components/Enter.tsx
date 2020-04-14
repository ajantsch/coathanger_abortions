import React from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

interface IEnterState {
  name: string;
}

const DEFAULT_STATE: IEnterState = {
  name: "",
};

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ joinGame: actions.joinGame }, dispatch);

class Enter extends React.PureComponent<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps,
  IEnterState
> {
  constructor(props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleNameChange = (value: string) => {
    this.setState({ name: value });
  };

  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.joinGame(this.state.name);
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Enter));
