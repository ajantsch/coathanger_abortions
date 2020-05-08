import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";

import actions from "../actions";
import { AppState } from "../reducers";
import { playerIsRoundCzar, playerIsRoundWinner } from "../selectors";

import Konfetti from "../components/Konfetti";
import Separator from "../components/Separator";

import GameRound from "./GameRound";
import PlayerCards from "./PlayerCards";
import BottomNav from "./BottomNav";
import ActionDrawer from "./ActionDrawer";
import GameNotifications from "./GameNotifications";

import LetteringLight from "../images/lettering_light.svg";
import LetteringDark from "../images/lettering_dark.svg";
import YSoSerious from "../images/y-so-serious-white.png";

const mapStateToProps = (state: AppState) => ({
  playerIsRoundCzar: playerIsRoundCzar(state),
  playerIsRoundWinner: playerIsRoundWinner(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      getCurrentRound: actions.getCurrentRound,
    },
    dispatch,
  );

type PlayGameProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ game_id: string }>;

class PlayGame extends React.Component<PlayGameProps, {}> {
  componentDidMount = async () => {
    this.props.getCurrentRound(this.props.match.params.game_id);
  };

  render = () => {
    return (
      <GameRoot>
        <GameAppBar position="static" className={this.props.playerIsRoundCzar && "czar"}>
          <Toolbar variant="dense">
            <ToolbarLogo
              src={this.props.playerIsRoundCzar ? LetteringDark : LetteringLight}
              alt="Coathanger Abortions"
            />
            <ToolbarTypography variant="body1">
              Game Code: <span className="bold">{this.props.match.params.game_id}</span>
            </ToolbarTypography>
          </Toolbar>
        </GameAppBar>
        <GameContainer maxWidth="lg">
          <GameRound />
          <Separator text="Your Cards" />
          <PlayerCards />
        </GameContainer>
        <Konfetti run={this.props.playerIsRoundWinner} />
        <GameNotifications />
        <BottomNav />
        <ActionDrawer />
      </GameRoot>
    );
  };
}

const GameRoot: AnyStyledComponent = styled(Box)`
  background-image: url(${YSoSerious});
  background-repeat: repeat;
  min-height: 100%;
`;

const GameAppBar: AnyStyledComponent = styled(AppBar)`
  && {
    &.czar {
      background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728);
      color: ${colors.dark};
    }
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayGame));
