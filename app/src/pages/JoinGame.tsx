import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";

import JoinLayout from "../components/JoinLayout";
import JoinGameForm from "../components/JoinGameForm";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ getGame: actions.getGame, joinGame: actions.joinGame, getPlayer: actions.getPlayer }, dispatch);

class JoinGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>
> {
  handleJoinGame = async (name: string) => {
    this.props.joinGame(name);
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
      <JoinLayout>
        <JoinGameForm onFormSubmit={this.handleJoinGame} />
      </JoinLayout>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinGame));
