import React from "react";
import { connect } from "react-redux";

import CardStack from "../components/CardStack";

import { AppState } from "../reducers";

const mapStateToProps = (state: AppState) => ({
  player: state.player,
});
class PlayerTrophies extends React.Component<ReturnType<typeof mapStateToProps>, {}> {
  render = () => {
    return this.props.player ? (
      <CardStack cards={this.props.player.wonCards} cardsClickable={false} condensed={false} />
    ) : (
      <></>
    );
  };
}

export default connect(mapStateToProps)(PlayerTrophies);
