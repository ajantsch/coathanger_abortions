import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Box, Button } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import { AppState } from "../reducers";
import actions from "../actions";

import Card from "../components/Card";
import CardStack from "../components/CardStack";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  player: state.player,
  round: state.round,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      revealQuestion: actions.revealQuestion,
      giveAnswer: actions.giveAnswer,
      revealAnswers: actions.revealAnswers,
      setWinner: actions.setWinner,
      startRound: actions.startNewRound,
    },
    dispatch,
  );

class GameRound extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  handleRevealQuestion = async () => {
    if (this.props.round?.czar === this.props.player?.id && !this.props.round?.questionRevealed) {
      this.props.revealQuestion();
    }
  };

  handleCardClicked = (card: ICard) => {
    if (
      this.props.round?.answersRevealed &&
      !this.props.round?.winner &&
      this.props.round?.czar === this.props.player?.id
    ) {
      const winner = this.props.round?.answers.find(answer => answer.card.id === card.id);
      if (winner) {
        this.props.setWinner(winner);
      }
    }
  };

  handleRevealAnswers = () => {
    if (this.props.round?.czar === this.props.player?.id) {
      this.props.revealAnswers();
    }
  };

  handleStartRound = () => {
    if (this.props.round?.winner?.player === this.props.player?.id) {
      this.props.startRound();
    }
  };

  render = () => {
    const showRevealAnswersButton =
      this.props.round?.question &&
      this.props.round?.czar === this.props.player?.id &&
      !!this.props.round.answers.length &&
      this.props.game?.players &&
      this.props.round.answers.length === this.props.game.players.length - 1 &&
      !this.props.round.answersRevealed;
    return (
      <CurrentRound>
        <QuestionCardSpace>
          {this.props.round?.question && (
            <Card
              card={this.props.round.question}
              isHidden={!this.props.round.questionRevealed}
              onCardClick={this.handleRevealQuestion}
            />
          )}
          {this.props.round?.winner?.player === this.props.player?.id && (
            <Button variant="contained" color="primary" onClick={this.handleStartRound}>
              Start next round
            </Button>
          )}
        </QuestionCardSpace>
        <AnswerCardsSpace>
          <CardStack
            cards={this.props.round?.answers.map(answer => answer.card) || []}
            cardsHidden={!this.props.round?.answersRevealed}
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
    margin: 0 -25px;
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
