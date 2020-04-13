import React from "react";
import { Box } from "@material-ui/core";

import { ICard, IGivenAnswer } from "../services/api/game";

import Card from "./Card";
import CardStack from "./CardStack";

interface IRoundProps {
  question: ICard | undefined;
  answers: IGivenAnswer[];
  answersVisible: boolean;
  winnerSelected: (winner: IGivenAnswer) => void;
}

class Round extends React.Component<IRoundProps, {}> {
  handleCardClicked = (card: ICard) => {
    const winner = this.props.answers.find(answer => answer.card.id === card.id);
    if (winner) {
      this.props.winnerSelected(winner);
    }
  };

  render = () => {
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box flexGrow={0} flexShrink={0} flexBasis={250}>
          {this.props.question ? (
            <Card id={this.props.question.id} type="question" content={this.props.question.content} />
          ) : (
            <></>
          )}
        </Box>
        <Box flexGrow={1} flexShrink={0} flexBasis={250}>
          <CardStack
            cards={this.props.answers.map(answer => answer.card)}
            cardsHidden={!this.props.answersVisible}
            onCardClick={this.handleCardClicked}
          />
        </Box>
      </Box>
    );
  };
}

export default Round;
