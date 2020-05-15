import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { AppContext } from "../AppContext";
import { ICard, IAnswerCard } from "../interfaces";

import { AppState } from "../reducers";
import actions from "../actions";
import { canGiveAnswer, playerIsRoundCzar } from "../selectors";

import CardStack from "../components/CardStack";

const mapStateToProps = (state: AppState) => ({
  gameId: state.game?.id,
  player: state.player,
  playerIsRoundCzar: playerIsRoundCzar(state),
  canGiveAnswer: canGiveAnswer(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ giveAnswer: actions.giveAnswer, replaceCard: actions.replaceAnswerCard }, dispatch);

class PlayerCards extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleAnswerCardClicked = (card: ICard) => {
    if (this.props.player && this.props.canGiveAnswer) {
      this.props.giveAnswer({ player: this.props.player.id, card: card as IAnswerCard });
    }
  };

  handleCardReplaceClick = (cardId: string) => {
    if (this.props.gameId && this.props.player) {
      this.props.replaceCard(this.props.gameId, this.props.player.id, cardId);
    }
  };

  render = () => {
    return this.props.player ? (
      <CardStack
        cards={this.props.player.activeCards}
        condensed={this.props.playerIsRoundCzar}
        cardsClickable={!this.props.playerIsRoundCzar}
        onCardClick={this.handleAnswerCardClicked}
        cardsReplaceable={!this.props.playerIsRoundCzar}
        onCardReplaceClick={this.handleCardReplaceClick}
        touchSupported={this.context.touchSupported}
      />
    ) : (
      <></>
    );
  };
}

PlayerCards.contextType = AppContext;

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCards);
