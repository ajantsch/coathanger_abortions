import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";
import { AppState } from "../reducers";
import actions from "../actions";
import { playerIsRoundCzar, playerIsRoundWinner, allAnswersAreIn } from "../selectors";

import Notification from "../components/Notification";
import Konfetti from "../components/Konfetti";
import Separator from "../components/Separator";

import GameRound from "./GameRound";
import PlayerCards from "./PlayerCards";
import BottomNav from "./BottomNav";
import ActionDrawer from "./ActionDrawer";

import LetteringLight from "../images/lettering_light.svg";
import LetteringDark from "../images/lettering_dark.svg";
import YSoSerious from "../images/y-so-serious-white.png";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
  player: state.player,
  playerIsRoundCzar: playerIsRoundCzar(state),
  playerIsRoundWinner: playerIsRoundWinner(state),
  allAnswersAreIn: allAnswersAreIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      getGame: actions.getGame,
      getPlayer: actions.getPlayer,
      getCurrentRound: actions.getCurrentRound,
      startRound: actions.startNewRound,
      revealAnswers: actions.revealAnswers,
    },
    dispatch,
  );

interface IPlayGameState {
  playerJoined: string | undefined;
}

const DEFAULT_STATE: IPlayGameState = {
  playerJoined: undefined,
};

type PlayGameProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ game_id: string }>;

class PlayGame extends React.Component<PlayGameProps, IPlayGameState> {
  constructor(props: PlayGameProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleSnackbarClose = () => {
    this.setState({ playerJoined: undefined });
  };

  handleRevealAnswers = () => {
    this.props.revealAnswers();
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
        <GameAppBar position="static" className={this.props.playerIsRoundCzar && "czar"}>
          <Toolbar variant="dense">
            <ToolbarLogo
              src={this.props.playerIsRoundCzar ? LetteringDark : LetteringLight}
              alt="Coathanger Abortions"
            />
            <ToolbarTypography variant="body1">
              Game Code: <span className="bold">{this.props.game?.id}</span>
            </ToolbarTypography>
          </Toolbar>
        </GameAppBar>
        <GameContainer maxWidth="lg">
          <GameRound />
          <Separator text="Your Cards" />
          <PlayerCards />
        </GameContainer>
        <Konfetti run={this.props.playerIsRoundWinner} />
        <Notification
          open={!!this.state.playerJoined}
          message={`Player joined: ${this.state.playerJoined ? this.state.playerJoined : ""}`}
          onClose={this.handleSnackbarClose}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
