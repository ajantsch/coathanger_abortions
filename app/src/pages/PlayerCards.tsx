import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Typography } from "@material-ui/core";

import CardStack from "../components/CardStack";
import { AppState } from "../reducers";
import actions from "../actions";
import { ICard } from "../interfaces";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
  round: state.round,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ giveAnswer: actions.giveAnswer }, dispatch);

class PlayerCards extends React.PureComponent<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleAnswerCardClicked = (card: ICard) => {
    if (!this.props.game || !this.props.player || !this.props.round || this.props.round.czar === this.props.player.id) {
      return;
    }
    this.props.giveAnswer({ player: this.props.player.id, card });
  };

  render = () => {
    return (
      <>
        {this.props.player && (
          <>
            <Typography variant="h5">Your cards</Typography>
            <CardStack cards={this.props.player.activeCards} onCardClick={this.handleAnswerCardClicked} />
            <CardStack cards={this.props.player.wonCards} />
          </>
        )}
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCards);
