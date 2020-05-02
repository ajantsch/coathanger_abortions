import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import CardStack from "../components/CardStack";

import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  player: state.player,
});
class PlayerTrophies extends React.Component<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return this.props.player?.wonCards.length ? (
      <>
        <Typography variant="h6">Your trophies</Typography>
        <CardStack cards={this.props.player.wonCards} cardsClickable={false} condensed={false} />
      </>
    ) : (
      <>
        <Typography variant="h6">You have no trophies yet</Typography>
        <Typography variant="body1">Seems like you have to work on your attitude towards this game!</Typography>
      </>
    );
  };
}

export default connect(mapStateToProps)(PlayerTrophies);
