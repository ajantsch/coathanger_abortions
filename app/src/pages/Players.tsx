import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";
import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
});

class Players extends React.PureComponent<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return (
      <PlayersContainer maxWidth="sm">
        <Typography variant="h6">Players in this game</Typography>
        <PlayersGrid container>
          {this.props.game?.players.map(player => (
            <Grid item key={player.id} xs={6} sm={4}>
              <PlayerEntry
                variant="body1"
                key={player.id}
                className={`${player.active ? "active" : "inactive"} ${player.id === this.props.round?.czar && "czar"}`}
              >
                {`${player.name}`}
                {player.wonCards.map(combo => (
                  <WonCardIcon key={combo.question.id} />
                ))}
              </PlayerEntry>
            </Grid>
          ))}
        </PlayersGrid>
      </PlayersContainer>
    );
  };
}

const PlayersContainer: AnyStyledComponent = styled(Container)`
  && {
    padding-top: 20px;
    padding-bottom: 25px;

    @media (min-width: 600px) {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
`;

const PlayersGrid: AnyStyledComponent = styled(Grid)`
  && {
    margin-top: 1rem;
  }
`;

const WonCardIcon: AnyStyledComponent = styled.span`
  display: inline-block;
  margin: 0 0 -2px 5px;
  height: 1rem;
  width: 0.7rem;
  background: ${colors.dark};
  border-radius: 2px;
`;

const PlayerEntry: AnyStyledComponent = styled(Typography)`
  && {
    &.czar {
      color: #bf953f;
    }

    &.inactive {
      opacity: 0.3;
    }
  }
`;

export default connect(mapStateToProps)(Players);
