import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppBar, BottomNavigation, BottomNavigationAction, Badge } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import PeopleIcon from "@material-ui/icons/People";
import ExitIcon from "@material-ui/icons/DirectionsRun";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import styled, { AnyStyledComponent } from "styled-components";

import actions from "../actions";
import { AppState } from "../reducers";
import { getActivePlayers } from "../selectors";

import NavDrawer from "../components/NavDrawer";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExitGameDialogContent from "../components/ExitGameDialogContent";
import PauseGameDialogContent from "../components/PauseGameDialogContent";
import PlayerTrophies from "./PlayerTrophies";
import Players from "./Players";

interface IBottomNavState {
  navDrawerOpen: boolean;
  navDrawerContent: string | undefined;
  dialogOpen: boolean;
  dialogContent: string | undefined;
}

const DEFAULT_STATE: IBottomNavState = {
  navDrawerOpen: false,
  navDrawerContent: undefined,
  dialogOpen: false,
  dialogContent: undefined,
};

const mapStateToProps = (state: AppState) => ({
  gameId: state.game?.id,
  playerId: state.player?.id,
  activePlayers: getActivePlayers(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      leaveGame: actions.leaveGame,
      pausePlaying: actions.pausePlaying,
      resumePlaying: actions.resumePlaying,
    },
    dispatch,
  );

type BottomNavProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class BottomNav extends React.PureComponent<BottomNavProps, IBottomNavState> {
  constructor(props: BottomNavProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  toggleNavDrawer = (content?: string) => {
    const newState: IBottomNavState = { ...this.state, navDrawerOpen: !this.state.navDrawerOpen };
    if (content) {
      newState.navDrawerContent = content;
    }
    this.setState(newState);
  };

  showShareMenu = () => {
    if (navigator.share) {
      // open os-native share menu
      navigator.share({
        title: "You are invited!",
        text: "Join our game and proof what a terrible person you are.",
        url: `https://&${window.location.host}/${this.props.gameId}`,
      });
    }
  };

  showExitGameDialog = () => {
    this.setState({ dialogOpen: true });
  };

  openConfirmationDialog = (content: string) => {
    if (content === "pause" && this.props.gameId && this.props.playerId) {
      this.props.pausePlaying(this.props.gameId, this.props.playerId);
    }
    this.setState({ dialogOpen: true, dialogContent: content });
  };

  handleDialogConfirmed = () => {
    this.setState({ dialogOpen: false });
    if (this.props.gameId && this.state.dialogContent === "exit") {
      this.props.leaveGame(this.props.gameId);
    }
    if (this.props.gameId && this.props.playerId && this.state.dialogContent === "pause") {
      this.props.resumePlaying(this.props.gameId, this.props.playerId);
    }
  };

  handleDialogCancelled = () => {
    this.setState({ dialogOpen: false });
  };

  handleNavItemClick = (_event: React.ChangeEvent<{}>, navItem: string) => {
    switch (navItem) {
      case "invite":
        this.showShareMenu();
        break;
      case "players":
        this.toggleNavDrawer("players");
        break;
      case "trophies":
        this.toggleNavDrawer("trophies");
        break;
      case "pause":
        this.openConfirmationDialog("pause");
        break;
      case "exit":
        this.openConfirmationDialog("exit");
    }
  };

  render = () => {
    return (
      <>
        <GameBottomAppBar position="fixed" color="secondary" component="footer">
          <GameBottomNavigation onChange={this.handleNavItemClick}>
            <GameBottomNavigationAction
              label="Players"
              value="players"
              icon={
                <Badge color="primary" badgeContent={this.props.activePlayers.length}>
                  <PeopleIcon />
                </Badge>
              }
            />
            <GameBottomNavigationAction label="Invite" value="invite" icon={<PersonAddIcon />} />
            <GameBottomNavigationAction label="Trophies" value="trophies" icon={<EmojiEventsIcon />} />
            <GameBottomNavigationAction label="Pause" value="pause" icon={<EmojiFoodBeverageIcon />} />
            <GameBottomNavigationAction label="Exit" value="exit" icon={<ExitIcon />} />
          </GameBottomNavigation>
        </GameBottomAppBar>

        <NavDrawer open={this.state.navDrawerOpen} onClick={this.toggleNavDrawer}>
          {(() => {
            switch (this.state.navDrawerContent) {
              case "players":
                return <Players />;
              case "trophies":
                return <PlayerTrophies />;
              default:
                return <></>;
            }
          })()}
        </NavDrawer>

        <ConfirmationDialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogCancelled}
          disableBackdropClick={this.state.dialogContent === "pause"}
          disableEscapeKeyDown={this.state.dialogContent === "pause"}
        >
          {(() => {
            switch (this.state.dialogContent) {
              case "exit":
                return (
                  <ExitGameDialogContent
                    onClickConfirm={this.handleDialogConfirmed}
                    onClickCancel={this.handleDialogCancelled}
                  />
                );
              case "pause":
                return <PauseGameDialogContent onClickConfirm={this.handleDialogConfirmed} />;
              default:
                return <></>;
            }
          })()}
        </ConfirmationDialog>
      </>
    );
  };
}

const GameBottomAppBar: AnyStyledComponent = styled(AppBar)`
  && {
    top: auto;
    bottom: 0;
  }
`;

const GameBottomNavigation: AnyStyledComponent = styled(BottomNavigation)`
  && {
    height: 62px;
    background: #ffffff;
  }
`;

const GameBottomNavigationAction: AnyStyledComponent = styled(BottomNavigationAction)`
  && {
    padding-top: 16px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
