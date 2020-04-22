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
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ giveAnswer: actions.giveAnswer }, dispatch);

class PlayerCards extends React.PureComponent<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleAnswerCardClicked = (card: ICard) => {
    if (
      !this.props.game ||
      !this.props.game.me ||
      !this.props.game.currentRound ||
      this.props.game.czar === this.props.game.me.id
    ) {
      return;
    }
    this.props.giveAnswer({ player: this.props.game.me.id, card });
  };

  render = () => {
    return (
      <>
        {this.props.game.me && (
          <>
            <Typography variant="h5">Your cards</Typography>
            <CardStack cards={this.props.game.me.activeCards} onCardClick={this.handleAnswerCardClicked} />
            <CardStack cards={this.props.game.me.wonCards} />
          </>
        )}
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCards);
