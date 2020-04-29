import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Drawer, Container, Badge } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import PeopleIcon from "@material-ui/icons/People";
import styled, { AnyStyledComponent } from "styled-components";
import Confetti from "react-confetti";

import { AppState } from "../reducers";
import actions from "../actions";

import Players from "../components/Players";
import StartGame from "../components/StartGame";
import Separator from "../components/Separator";
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

interface IPlayGameState {
  playersDrawerOpen: boolean;
  shareDrawerOpen: boolean;
}

const DEFAULT_STATE: IPlayGameState = {
  playersDrawerOpen: false,
  shareDrawerOpen: false,
};

type PlayGameProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ game_id: string }>;

class PlayGame extends React.Component<PlayGameProps, IPlayGameState> {
  reward: unknown;

  constructor(props: PlayGameProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleStartPlaying = () => {
    this.props.startRound();
  };

  handleAppBarClick = (_event: React.ChangeEvent<{}>, navItem: string) => {
    switch (navItem) {
      case "share":
        this.showShareMenu();
        break;
      case "players":
        this.togglePlayersDrawer();
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

  togglePlayersDrawer = () => {
    this.setState({ playersDrawerOpen: !this.state.playersDrawerOpen });
  };

  showPlayersDrawer = () => {
    this.setState({ playersDrawerOpen: true });
  };

  hidePlayersDrawer = () => {
    this.setState({ playersDrawerOpen: false });
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
      <GameRoot>
        <GameContainer maxWidth="lg">
          {!!this.props.game?.id && !!this.props.player?.id && (
            <>
              {this.props.round ? <GameRound /> : <StartGame onClickStart={this.handleStartPlaying} />}
              <Separator text="Your Cards" />
              <PlayerCards />
            </>
          )}
        </GameContainer>
        <StyledConfetti
          recycle={false}
          colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
          opacity={0.9}
          initialVelocityX={0}
          run={this.props.round?.winner?.player === this.props.player?.id}
        />
        <GameBottomAppBar position="fixed" color="secondary" component="footer">
          <GameBottomNavigation showLabels={true} onChange={this.handleAppBarClick}>
            <GameBottomNavigationAction
              label="Players"
              value="players"
              icon={
                <Badge color="primary" badgeContent={this.props.game?.players.length}>
                  <PeopleIcon />
                </Badge>
              }
            />
            <GameBottomNavigationAction label="Share" value="share" icon={<ShareIcon />} />
          </GameBottomNavigation>
        </GameBottomAppBar>

        <Drawer
          anchor="bottom"
          variant="temporary"
          open={this.state.playersDrawerOpen}
          onClick={this.hidePlayersDrawer}
          PaperProps={{ color: "secondary", style: { margin: "0 auto", padding: "25px", maxWidth: "600px" } }}
          ModalProps={{ hideBackdrop: true }}
        >
          <DrawerContent>
            <Players />
          </DrawerContent>
        </Drawer>
      </GameRoot>
    );
  };
}

const StyledConfetti: AnyStyledComponent = styled(Confetti)`
  position: fixed !important;
`;

const GameRoot: AnyStyledComponent = styled(Box)`
  background-image: url(${YSoSerious});
  background-repeat: repeat;
  min-height: 100%;
`;

const GameContainer: AnyStyledComponent = styled(Container)`
  && {
    padding-bottom: 66px;
  }
`;

const GameBottomAppBar: AnyStyledComponent = styled(AppBar)`
  && {
    top: auto;
    bottom: 0;
    z-index: 1500;
  }
`;

const GameBottomNavigation: AnyStyledComponent = styled(BottomNavigation)`
  && {
    height: 66px;
    background: #ffffff;
  }
`;

const GameBottomNavigationAction: AnyStyledComponent = styled(BottomNavigationAction)`
  && {
    padding-top: 16px;
  }
`;

const DrawerContent: AnyStyledComponent = styled.div`
  && {
    padding-bottom: 66px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
