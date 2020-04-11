import React from "react";
import { Typography } from "@material-ui/core";

interface IPlayersProps {
  players: { id: string; name: string }[];
  czar?: string;
}

class Players extends React.PureComponent<IPlayersProps, {}> {
  render = () => {
    return (
      <>
        <Typography variant="h4">Players</Typography>
        {this.props.players.map(player => (
          <Typography variant="body1" key={player.id}>
            {player.name}
            {this.props.czar === player.id && " (czar)"}
          </Typography>
        ))}
      </>
    );
  };
}

export default Players;
