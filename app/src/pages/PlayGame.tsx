import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Box, Container } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";
import store from "../store";

import Players from "../components/Players";
import PlayerCards from "./PlayerCards";
import Round from "./GameRound";

import YSoSerious from "../images/y-so-serious-white.png";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ getGame: actions.getGame }, dispatch);

class PlayGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>,
  {}
> {
  componentDidMount = async () => {
    if (this.props.match.params.game_id) {
      this.props.getGame(this.props.match.params.game_id);
    }

    store.subscribe(() => {
      const game = store.getState().game;
      if (!game) {
        return this.props.history.push("/");
      }
      if (!store.getState().player) {
        return this.props.history.push(`/${game.id}/join`);
      }
    });
  };

  render = () => {
    return (
      <GameWrapper>
        <Container maxWidth="lg">
          {this.props.game?.id && this.props.player?.id ? (
            <>
              <Round />
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
