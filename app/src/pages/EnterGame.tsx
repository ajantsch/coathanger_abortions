import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Button, TextField } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";
import { AppState } from "../reducers";
import actions from "../actions";

interface IEnterGameState {
  name: string;
}

const DEFAULT_STATE: IEnterGameState = {
  name: "",
};

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ getGame: actions.getGame, joinGame: actions.joinGame, getPlayer: actions.getPlayer }, dispatch);

type EnterGameProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ game_id: string }>;

class EnterGame extends React.Component<EnterGameProps, IEnterGameState> {
  constructor(props: EnterGameProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleNameChange = (value: string) => {
    this.setState({ name: value });
  };

  handleEnterGame = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.joinGame(this.state.name);
  };

  componentDidUpdate = () => {
    if (!this.props.game) {
      return this.props.history.push("/");
    }
    if (this.props.game && this.props.player) {
      return this.props.history.push(`/${this.props.game.id}`);
    } else {
      this.props.getPlayer();
    }
  };

  componentDidMount = () => {
    this.props.getGame(this.props.match.params.game_id);
  };

  render = () => {
    return (
      <form onSubmit={this.handleEnterGame}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EnterGame));
