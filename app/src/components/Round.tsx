import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Box } from "@material-ui/core";

import { ICard } from "../interfaces";
import { AppState } from "../reducers";
import actions from "../actions";

import Card from "./Card";
import CardStack from "./CardStack";

interface IRoundProps {
  answersVisible: boolean;
}

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ giveAnswer: actions.giveAnswer, setWinner: actions.setWinner }, dispatch);

class Round extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IRoundProps,
  {}
> {
  handleCardClicked = (card: ICard) => {
    if (this.props.game.czar === this.props.game.me?.id) {
      const winner = this.props.game.currentRound.answers.find(answer => answer.card.id === card.id);
      if (winner) {
        this.props.setWinner(winner);
      }
    }
  };

  render = () => {
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box flexGrow={0} flexShrink={0} flexBasis={250}>
          {this.props.game.currentRound.question ? <Card card={this.props.game.currentRound.question} /> : <></>}
        </Box>
        <Box flexGrow={1} flexShrink={0} flexBasis={250}>
          <CardStack
            cards={this.props.game.currentRound.answers.map(answer => answer.card)}
            cardsHidden={!this.props.answersVisible}
            onCardClick={this.handleCardClicked}
          />
        </Box>
      </Box>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Round);
