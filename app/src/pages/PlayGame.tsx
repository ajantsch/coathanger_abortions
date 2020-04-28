import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, Badge } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import PeopleIcon from "@material-ui/icons/People";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

import StartGame from "../components/StartGame";
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
      getCurrentRound: actions.getCurrentRound,
      startRound: actions.startNewRound,
    },
    dispatch,
  );

class PlayGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>,
  {}
> {
  handleStartPlaying = () => {
    this.props.startRound();
  };

  handleAppBarClick = (_event: React.ChangeEvent<{}>, navItem: string) => {
    switch (navItem) {
      case "share":
        this.showShareMenu();
    }
  };

  showShareMenu = () => {
    if (navigator.share) {
      console.warn(window.location.host);
      // open os-native share menu
      navigator.share({
        title: "You are invited!",
        text: "Join our game and proof what a terrible person you are.",
        url: `${window.location.host}/${this.props.game?.id}`,
      });
    }
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
          {!!this.props.game?.id && !!this.props.player?.id && (
            <>
              {this.props.round ? <GameRound /> : <StartGame onClickStart={this.handleStartPlaying} />}
              <PlayerCards />
            </>
          )}
        </Container>
        <GameBottomAppBar position="sticky" color="secondary">
          <GameBottomNavigation showLabels onChange={this.handleAppBarClick}>
            <GameBottomNavigationAction
              label="Players"
              value="players"
              icon={
                <Badge badgeContent={this.props.game?.players.length} color="primary">
                  <PeopleIcon />
                </Badge>
              }
            />
            <GameBottomNavigationAction label="Share" value="share" icon={<ShareIcon />} />
          </GameBottomNavigation>
        </GameBottomAppBar>
      </GameWrapper>
    );
  };
}

const GameWrapper: AnyStyledComponent = styled(Box)`
  background-image: url(${YSoSerious});
  background-repeat: repeat;
  min-height: 100%;
`;

const GameBottomAppBar: AnyStyledComponent = styled(AppBar)`
  top: auto;
  bottom: 0;
`;

const GameBottomNavigation: AnyStyledComponent = styled(BottomNavigation)`
  && {
    height: 66px;
  }
`;

const GameBottomNavigationAction: AnyStyledComponent = styled(BottomNavigationAction)`
  && {
    padding-top: 16px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
