import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { ICard, IAnswerCard } from "../interfaces";

import CardStack from "../components/CardStack";

import { AppState } from "../reducers";
import actions from "../actions";
import { canGiveAnswer, playerIsRoundCzar } from "../selectors";

const mapStateToProps = (state: AppState) => ({
  player: state.player,
  playerIsRoundCzar: playerIsRoundCzar(state),
  canGiveAnswer: canGiveAnswer(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ giveAnswer: actions.giveAnswer }, dispatch);

class PlayerCards extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleAnswerCardClicked = (card: ICard) => {
    if (this.props.canGiveAnswer) {
      this.props.giveAnswer({ player: this.props.player?.id as string, card: card as IAnswerCard });
    }
  };

  render = () => {
    return this.props.player ? (
      <CardStack
        cards={this.props.player.activeCards}
        condensed={this.props.playerIsRoundCzar}
        cardsClickable={!this.props.playerIsRoundCzar}
        onCardClick={this.handleAnswerCardClicked}
      />
    ) : (
      <></>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCards);
