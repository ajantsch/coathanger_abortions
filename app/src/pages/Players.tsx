import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
});

class Players extends React.PureComponent<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6">Players in this game</Typography>
        <PlayersGrid container>
          {this.props.game?.players.map(player => (
            <Grid item key={player.id} xs={6} sm={4}>
              <PlayerEntry
                variant="body1"
                key={player.id}
                className={player.active ? "active" : "inactive"}
                color={player.id === this.props.round?.czar ? "error" : "primary"}
              >
                {`${player.name}`}
                {player.wonCards.map(card => (
                  <WonCardIcon key={card.id} />
                ))}
              </PlayerEntry>
            </Grid>
          ))}
        </PlayersGrid>
      </Container>
    );
  };
}

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
  background: #1c1c1c;
  border-radius: 2px;
`;

const PlayerEntry: AnyStyledComponent = styled(Typography)`
  && {
    &.inactive {
      opacity: 0.3;
    }
  }
`;

export default connect(mapStateToProps)(Players);
