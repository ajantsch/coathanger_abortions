import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Box, Container, Button } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

import Players from "../components/Players";
import PlayerCards from "./PlayerCards";
import GameRound from "./GameRound";

import YSoSerious from "../images/y-so-serious-white.png";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      getGame: actions.getGame,
      getPlayer: actions.getPlayer,
      startRound: actions.startNewRound,
      getCurrentRound: actions.getCurrentRound,
    },
    dispatch,
  );

class PlayGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>,
  {}
> {
  handleStartRound = () => {
    this.props.startRound();
  };

  componentDidUpdate = () => {
    if (!this.props.game) {
      return this.props.history.push("/");
    }
    if (this.props.game && !this.props.player) {
      return this.props.history.push(`/${this.props.game.id}/join`);
    }
  };

  componentDidMount = async () => {
    this.props.getGame(this.props.match.params.game_id);
    if (!this.props.game) {
      return this.props.history.push("/");
    }
    if (this.props.game && !this.props.player) {
      this.props.getPlayer();
    }
    if (this.props.game && !this.props.round) {
      this.props.getCurrentRound();
    }
  };

  render = () => {
    return (
      <GameWrapper>
        <Container maxWidth="lg">
          {this.props.game?.id && this.props.player?.id ? (
            <>
              {this.props.round && <GameRound />}
              {!this.props.round && (
                <Button variant="contained" color="primary" onClick={this.handleStartRound}>
                  Start playing
                </Button>
              )}
              {this.props.round?.winner?.player === this.props.player.id && (
                <Button variant="contained" color="primary" onClick={this.handleStartRound}>
                  Start next round
                </Button>
              )}
              <PlayerCards />
              <Players />
            </>
          ) : (
            <></>
          )}
        </Container>
      </GameWrapper>
    );
  };
}

const GameWrapper: AnyStyledComponent = styled(Box)`
  background-image: url(${YSoSerious});
  background-repeat: repeat;
  min-height: 100%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
