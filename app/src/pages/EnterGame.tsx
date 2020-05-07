import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

import EnterGameForm from "../components/EnterGameForm";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      getGame: actions.getGame,
      joinGame: actions.joinGame,
      getPlayer: actions.getPlayer,
      resetGame: actions.resetGame,
      resetPlayer: actions.resetPlayer,
    },
    dispatch,
  );

class EnterGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>
> {
  handleEnterGame = async (name: string) => {
    if (this.props.game) {
      this.props.joinGame(this.props.game.id, name);
    }
  };

  componentDidUpdate = () => {
    if (!this.props.game) {
      return this.props.history.push("/");
    }
    if (this.props.game && this.props.player) {
      return this.props.history.push(`/${this.props.match.params.game_id}`);
    }
  };

  componentDidMount = () => {
    if (this.props.game && this.props.game.id !== this.props.match.params.game_id) {
      this.props.resetGame();
    } else {
      if (!this.props.game) {
        this.props.getGame(this.props.match.params.game_id);
      }
      if (!this.props.player) {
        this.props.getPlayer(this.props.match.params.game_id);
      }
    }
  };

  render = () => {
    return <EnterGameForm onFormSubmit={this.handleEnterGame} />;
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterGame));
