import React from "react";
import { connect } from "react-redux";
import { Box, Container, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import CardCombo from "../components/CardCombo";
import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  player: state.player,
});

class PlayerTrophies extends React.Component<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return this.props.player?.wonCards.length ? (
      <CardComboScrollContainer>
        {this.props.player.wonCards.map(combo => (
          <CardCombo key={combo.question.id} {...combo} />
        ))}
      </CardComboScrollContainer>
    ) : (
      <NoTrophiesContainer maxWidth="sm">
        <Typography variant="h6">You have no trophies yet</Typography>
        <Typography variant="body1">Seems like you have to work on your attitude towards this game!</Typography>
      </NoTrophiesContainer>
    );
  };
}

const NoTrophiesContainer: AnyStyledComponent = styled(Container)`
  && {
    padding-top: 20px;
    padding-bottom: 25px;

    @media (min-width: 600px) {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
`;

const CardComboScrollContainer: AnyStyledComponent = styled(Box)`
  && {
    width: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: center;

    padding-top: 20px;
    padding-bottom: 25px;

    @media (min-width: 600px) {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
`;

export default connect(mapStateToProps)(PlayerTrophies);
