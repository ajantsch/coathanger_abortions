import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Box, Button } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import { AppState } from "../reducers";
import actions from "../actions";

import Card from "../components/Card";
import CardPlaceholder from "../components/CardPlaceholder";
import CardStack from "../components/CardStack";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      drawQuestion: actions.drawQuestion,
      giveAnswer: actions.giveAnswer,
      revealAnswers: actions.revealAnswers,
      setWinner: actions.setWinner,
    },
    dispatch,
  );

class GameRound extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleDrawQuestion = async () => {
    if (
      !this.props.game.id ||
      !this.props.game.me ||
      this.props.game.czar !== this.props.game.me.id ||
      this.props.game.currentRound.question
    ) {
      return;
    }
    this.props.drawQuestion();
  };

  handleCardClicked = (card: ICard) => {
    if (this.props.game.czar === this.props.game.me?.id) {
      const winner = this.props.game.currentRound.answers.find(answer => answer.card.id === card.id);
      if (winner) {
        this.props.setWinner(winner);
      }
    }
  };

  handleRevealAnswers = () => {
    if (this.props.game.czar === this.props.game.me?.id) {
      this.props.revealAnswers();
    }
  };

  render = () => {
    const showDrawQuestionButton =
      this.props.game.czar === this.props.game.me?.id && !this.props.game.currentRound.question;
    const showRevealAnswersButton =
      this.props.game.currentRound.question &&
      this.props.game.czar === this.props.game.me?.id &&
      !!this.props.game.currentRound.answers.length &&
      this.props.game.currentRound.answers.length === this.props.game.players.length - 1 &&
      !this.props.game.currentRound.answersRevealed;
    return (
      <CurrentRound>
        <QuestionCardSpace>
          {this.props.game.currentRound.question ? (
            <Card card={this.props.game.currentRound.question} />
          ) : (
            <CardPlaceholder
              type="question"
              content={showDrawQuestionButton ? "Click to draw question card" : "Question will come soon..."}
              icon={showDrawQuestionButton ? <ControlPoint fontSize="large" /> : undefined}
              onPlaceholderClick={showDrawQuestionButton ? this.handleDrawQuestion : undefined}
            />
          )}
        </QuestionCardSpace>
        <AnswerCardsSpace>
          <CardStack
            cards={this.props.game.currentRound.answers.map(answer => answer.card)}
            cardsHidden={!this.props.game.currentRound.answersRevealed}
            onCardClick={this.handleCardClicked}
          />
          {showRevealAnswersButton && (
            <Button variant="contained" color="primary" onClick={this.handleRevealAnswers}>
              Reveal answers
            </Button>
          )}
        </AnswerCardsSpace>
      </CurrentRound>
    );
  };
}

const CurrentRound: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const QuestionCardSpace: AnyStyledComponent = styled(Box)`
  && {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 250px;
  }
`;

const AnswerCardsSpace: AnyStyledComponent = styled(Box)`
  && {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 250px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(GameRound);
