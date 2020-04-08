import React from "react";
import { Typography } from "@material-ui/core";

interface IPlayersProps {
  players: { id: string; name: string }[];
}

class Players extends React.PureComponent<IPlayersProps, {}> {
  render = () => {
    return (
      <>
        <Typography variant="h4">Players</Typography>
        {this.props.players.map(player => (
          <Typography variant="body1" key={player.id}>
            {player.name}
          </Typography>
        ))}
      </>
    );
  };
}

export default Players;
