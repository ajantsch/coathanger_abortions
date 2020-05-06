import React from "react";
import { connect } from "react-redux";
import { AppBar, BottomNavigation, BottomNavigationAction, Badge } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import PeopleIcon from "@material-ui/icons/People";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import { getActivePlayers } from "../selectors";

interface INavBarProps {
  onNavItemClick: (item: string) => void;
}

const mapStateToProps = (state: AppState) => ({
  activePlayers: getActivePlayers(state),
});

class NavBar extends React.PureComponent<ReturnType<typeof mapStateToProps> & INavBarProps, {}> {
  handleAppBarClick = (_event: React.ChangeEvent<{}>, navItem: string) => {
    this.props.onNavItemClick(navItem);
  };

  render = () => {
    return (
      <GameBottomAppBar position="fixed" color="secondary" component="footer">
        <GameBottomNavigation onChange={this.handleAppBarClick}>
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

export default connect(mapStateToProps)(NavBar);
