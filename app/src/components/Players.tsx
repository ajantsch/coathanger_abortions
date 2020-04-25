import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
});

class Players extends React.PureComponent<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return (
      <>
        <Typography variant="h4">Players</Typography>
        {this.props.game?.players.map(player => (
          <Typography variant="body1" key={player.id}>
            {`${player.name} (${player.wonCards.length} won cards)`}
            {this.props.round?.czar === player.id && " (czar)"}
          </Typography>
        ))}
      </>
    );
  };
}

export default connect(mapStateToProps)(Players);
