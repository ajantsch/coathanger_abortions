import React from "react";
import { Typography } from "@material-ui/core";

import { IPlayer } from "../services/api/game";

interface IPlayersProps {
  players: Omit<IPlayer, "activeCards">[];
  czar?: string;
}

class Players extends React.PureComponent<IPlayersProps, {}> {
  render = () => {
    return (
      <>
        <Typography variant="h4">Players</Typography>
        {this.props.players.map(player => (
          <Typography variant="body1" key={player.id}>
            {`${player.name} (${player.wonCards.length} won cards)`}
            {this.props.czar === player.id && " (czar)"}
          </Typography>
        ))}
      </>
    );
  };
}

export default Players;
