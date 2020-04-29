import React from "react";
import { AppBar, BottomNavigation, BottomNavigationAction, Badge } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import PeopleIcon from "@material-ui/icons/People";
import styled, { AnyStyledComponent } from "styled-components";

interface INavBarProps {
  onNavItemClick: (item: string) => void;
  badgeContent?: number;
}

class NavBar extends React.PureComponent<INavBarProps, {}> {
  handleAppBarClick = (_event: React.ChangeEvent<{}>, navItem: string) => {
    this.props.onNavItemClick(navItem);
  };

  render = () => {
    return (
      <GameBottomAppBar position="fixed" color="secondary" component="footer">
        <GameBottomNavigation showLabels={true} onChange={this.handleAppBarClick}>
          <GameBottomNavigationAction
            label="Players"
            value="players"
            icon={
              <Badge color="primary" badgeContent={this.props.badgeContent}>
                <PeopleIcon />
              </Badge>
            }
          />
          <GameBottomNavigationAction label="Share" value="share" icon={<ShareIcon />} />
        </GameBottomNavigation>
      </GameBottomAppBar>
    );
  };
}

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

export default NavBar;
