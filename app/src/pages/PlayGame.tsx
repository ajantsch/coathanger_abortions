import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, Box, Container, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core";
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
import WinnerDialog from "./WinnerDialog";

function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

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
        <HideOnScroll {...this.props}>
          <GameAppBar className={this.props.playerIsRoundCzar && "czar"}>
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
        </HideOnScroll>
        <GameContainer maxWidth="lg">
          <GameRound />
          <Separator text="Your Cards" />
          <PlayerCards />
        </GameContainer>
        <Konfetti run={this.props.playerIsRoundWinner} />
        <WinnerDialog />
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
    padding-top: 48px;
    padding-bottom: 62px;
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
