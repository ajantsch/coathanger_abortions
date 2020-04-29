import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
});

class Players extends React.PureComponent<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return (
      <>
        <Typography variant="h6">Players in this game</Typography>
        <PlayersGrid container>
          {this.props.game?.players.map(player => (
            <Grid item key={player.id} xs={6} sm={4}>
              <Typography variant="body1" key={player.id}>
                {`${player.name}`}
                {player.wonCards.map(card => (
                  <WonCardIcon key={card.id} />
                ))}
              </Typography>
            </Grid>
          ))}
        </PlayersGrid>
      </>
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

export default connect(mapStateToProps)(Players);
