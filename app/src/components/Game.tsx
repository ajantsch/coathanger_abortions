import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Button, Typography } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

import { AppState } from "../reducers";
import actions from "../actions";
// import GameApi from "../services/api";

import Enter from "./Enter";
import Players from "./Players";
import MyCards from "../pages/MyCards";
import Round from "./Round";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    { getGame: actions.getGame, playerJoined: actions.remotePlayerJoined, drawQuestion: actions.drawQuestion },
    dispatch,
  );

class Game extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>,
  {}
> {
  handleDrawQuestionCard = async () => {
    if (
      !this.props.game.id ||
      !this.props.game.me ||
      this.props.game.czar !== this.props.game.me.id ||
      this.props.game.currentRound.question
    ) {
      return;
    }
    this.props.drawQuestion();
  };

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
        {!this.props.game.me && this.props.game.id && <Enter />}
        {this.props.game.me && this.props.game.id && (
          <>
            {this.props.game.czar === this.props.game.me.id && !this.props.game.currentRound.question && (
              <Button variant="contained" color="primary" onClick={this.handleDrawQuestionCard}>
                Draw question card
              </Button>
            )}
            <Round answersVisible={this.props.game.currentRound.answers.length >= this.props.game.players.length - 1} />
            <Typography variant="h5">Your cards</Typography>
            <MyCards />
            <Players />
          </>
        )}
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
