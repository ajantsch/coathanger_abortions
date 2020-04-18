import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Box, Container } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";
import actions from "../actions";

import Players from "../components/Players";
import MyCards from "./MyCards";
import Round from "./Round";

import YSoSerious from "../images/y-so-serious-white.png";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ getGame: actions.getGame }, dispatch);

class PlayGame extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{ game_id: string }>,
  {}
> {
  componentDidUpdate = () => {
    if (!this.props.game.id) {
      this.props.history.push("/");
    }
    if (!this.props.game.me) {
      this.props.history.push(`/${this.props.game.id}/join`);
    }
  };

  componentDidMount = async () => {
    if (this.props.match.params.game_id) {
      this.props.getGame(this.props.match.params.game_id);
    }
  };

  render = () => {
    return (
      <GameWrapper>
        <Container maxWidth="lg">
          <Round />
          <MyCards />
          <Players />
        </Container>
      </GameWrapper>
    );
  };
}

const GameWrapper: AnyStyledComponent = styled(Box)`
  background-image: url(${YSoSerious});
  background-repeat: repeat;
  min-height: 100%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));
