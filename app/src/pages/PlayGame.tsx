import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

import BottomDrawer from "../components/BottomDrawer";
import BottomNav from "./BottomNav";
import Notification from "../components/Notification";
import Konfetti from "../components/Konfetti";
import Separator from "../components/Separator";

import GameRound from "./GameRound";
import PlayerCards from "./PlayerCards";
import PlayerTrophies from "./PlayerTrophies";
import Players from "./Players";

import LetteringLight from "../images/lettering_light.svg";
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
  playerJoined: string | undefined;
  drawerOpen: boolean;
  drawerContent: string | undefined;
}

const DEFAULT_STATE: IPlayGameState = {
  playerJoined: undefined,
  drawerOpen: false,
  drawerContent: undefined,
};

type PlayGameProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ game_id: string }>;

class PlayGame extends React.Component<PlayGameProps, IPlayGameState> {
  constructor(props: PlayGameProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleNavItemClick = (navItem: string) => {
    switch (navItem) {
      case "invite":
        this.showShareMenu();
        break;
      case "players":
        this.toggleDrawer("players");
        break;
      case "trophies":
        this.toggleDrawer("trophies");
    }
  };

  showShareMenu = () => {
    if (navigator.share) {
      console.warn(window.location.host);
      // open os-native share menu
      navigator.share({
        title: "You are invited!",
        text: "Join our game and proof what a terrible person you are.",
        url: `https://&${window.location.host}/${this.props.game?.id}/join`,
      });
    }
  };

  toggleDrawer = (content?: string) => {
    const newState: IPlayGameState = { ...this.state, drawerOpen: !this.state.drawerOpen };
    if (content) {
      newState.drawerContent = content;
    }
    this.setState(newState);
  };

  handleSnackbarClose = () => {
    this.setState({ playerJoined: undefined });
  };

  componentDidUpdate = (prevProps: PlayGameProps) => {
    if (!this.props.game) {
      return this.props.history.push("/");
    }
    if (this.props.game && !this.props.player) {
      return this.props.history.push(`/${this.props.game.id}/join`);
    }

    // check if new player joined the game
    const joinedPlayer = this.props.game.players.filter(
      player => (prevProps.game?.players || []).map(prevPlayer => prevPlayer.id).indexOf(player.id) < 0,
    );
    if (joinedPlayer.length && joinedPlayer[0].id !== this.props.player?.id) {
      this.setState({ playerJoined: joinedPlayer[0].name });
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
        <AppBar position="static">
          <Toolbar variant="dense">
            <ToolbarLogo src={LetteringLight} alt="Coathanger Abortions" />
            <ToolbarTypography variant="body1">
              Game ID: <span className="bold">{this.props.game?.id}</span>
            </ToolbarTypography>
          </Toolbar>
        </AppBar>
        <GameContainer maxWidth="lg">
          <GameRound />
          <Separator text="Your Cards" />
          <PlayerCards />
        </GameContainer>
        <Konfetti run={this.props.round?.winner?.player === this.props.player?.id} />
        <Notification
          open={!!this.state.playerJoined}
          message={`Player joined: ${this.state.playerJoined ? this.state.playerJoined : ""}`}
          onClose={this.handleSnackbarClose}
        />
        <BottomNav onNavItemClick={this.handleNavItemClick} />
        <BottomDrawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
          {(() => {
            switch (this.state.drawerContent) {
              case "players":
                return <Players />;
              case "trophies":
                return <PlayerTrophies />;
              default:
                return <></>;
            }
          })()}
        </BottomDrawer>
      </GameRoot>
    );
  };
}

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

const ToolbarLogo: AnyStyledComponent = styled.img`
  height: 24px;
`;

const ToolbarTypography: AnyStyledComponent = styled(Typography)`
  && {
    width: 100%;
    text-align: right;

    & > .bold {
      font-weight: 700;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
