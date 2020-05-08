import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppBar, BottomNavigation, BottomNavigationAction, Badge } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import PeopleIcon from "@material-ui/icons/People";
import ExitIcon from "@material-ui/icons/DirectionsRun";
import styled, { AnyStyledComponent } from "styled-components";

import actions from "../actions";
import { AppState } from "../reducers";
import { getActivePlayers } from "../selectors";

import NavDrawer from "../components/NavDrawer";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PlayerTrophies from "./PlayerTrophies";
import Players from "./Players";

interface IBottomNavState {
  navDrawerOpen: boolean;
  navDrawerContent: string | undefined;
  dialogOpen: boolean;
}

const DEFAULT_STATE: IBottomNavState = {
  navDrawerOpen: false,
  navDrawerContent: undefined,
  dialogOpen: false,
};

const mapStateToProps = (state: AppState) => ({
  gameId: state.game?.id,
  activePlayers: getActivePlayers(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      leaveGame: actions.leaveGame,
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
        url: `https://&${window.location.host}/${this.props.gameId}/join`,
      });
    }
  };

  showExitGameDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = (confirmed: boolean) => {
    this.setState({ dialogOpen: false });
    if (confirmed && this.props.gameId) {
      this.props.leaveGame(this.props.gameId);
    }
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
      case "exit":
        this.showExitGameDialog();
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
            <GameBottomNavigationAction label="Trophies" value="trophies" icon={<EmojiEventsIcon />} />
            <GameBottomNavigationAction label="Invite" value="invite" icon={<PersonAddIcon />} />
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

        <ConfirmationDialog open={this.state.dialogOpen} onClose={this.handleDialogClose} />
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
