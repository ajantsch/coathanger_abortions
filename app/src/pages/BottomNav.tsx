import React from "react";
import { connect } from "react-redux";
import { AppBar, BottomNavigation, BottomNavigationAction, Badge } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import PeopleIcon from "@material-ui/icons/People";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import { getActivePlayers } from "../selectors";

import NavDrawer from "../components/NavDrawer";
import PlayerTrophies from "./PlayerTrophies";
import Players from "./Players";

interface IBottomNavState {
  navDrawerOpen: boolean;
  navDrawerContent: string | undefined;
}

const DEFAULT_STATE: IBottomNavState = {
  navDrawerOpen: false,
  navDrawerContent: undefined,
};

const mapStateToProps = (state: AppState) => ({
  gameId: state.game?.id,
  activePlayers: getActivePlayers(state),
});

type BottomNavProps = ReturnType<typeof mapStateToProps>;

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
      console.warn(window.location.host);
      // open os-native share menu
      navigator.share({
        title: "You are invited!",
        text: "Join our game and proof what a terrible person you are.",
        url: `https://&${window.location.host}/${this.props.gameId}/join`,
      });
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

export default connect(mapStateToProps)(BottomNav);
