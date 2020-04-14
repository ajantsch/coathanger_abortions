import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";
// import GameApi from "../services/api";

import JoinGame from "./JoinGame";
import Players from "../components/Players";
import MyCards from "./MyCards";
import Round from "./Round";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ getGame: actions.getGame }, dispatch);

class PlayGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>,
  {}
> {
  componentDidUpdate = () => {
    if (!this.props.game.id) {
      this.props.history.push("/");
    }
  };

  componentDidMount = async () => {
    if (this.props.match.params.game_id) {
      this.props.getGame(this.props.match.params.game_id);
    }
  };

  render = () => {
    return (
      <>
        {!this.props.game.me && this.props.game.id && <JoinGame />}
        {this.props.game.me && this.props.game.id && (
          <>
            <Round answersVisible={this.props.game.currentRound.answers.length >= this.props.game.players.length - 1} />
            <MyCards />
            <Players />
          </>
        )}
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
