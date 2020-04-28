import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { ICard, IAnswerCard } from "../interfaces";

import Separator from "../components/Separator";
import CardStack from "../components/CardStack";

import { AppState } from "../reducers";
import actions from "../actions";

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
    this.props.giveAnswer({ player: this.props.player.id, card: card as IAnswerCard });
  };

  render = () => {
    return (
      <>
        {this.props.player && (
          <>
            <CardStack
              cards={this.props.player.activeCards}
              cardsClickable={this.props.round?.czar !== this.props.player.id}
              onCardClick={this.handleAnswerCardClicked}
            />
            {!!this.props.player.wonCards.length && (
              <>
                <Separator text="Your Trophies" />
                <CardStack cards={this.props.player.wonCards} cardsClickable={false} condensed={true} />
              </>
            )}
          </>
        )}
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCards);
