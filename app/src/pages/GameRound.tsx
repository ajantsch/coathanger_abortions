import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import { AppState } from "../reducers";
import actions from "../actions";
import { playerIsRoundCzar, canSelectWinner } from "../selectors";

import Card from "../components/Card";
import CardStack from "../components/CardStack";
import StartGame from "../components/StartGame";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
  playerIsRoundCzar: playerIsRoundCzar(state),
  canSelectWinner: canSelectWinner(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      revealQuestion: actions.revealQuestion,
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
    if (this.props.game && this.props.playerIsRoundCzar && !this.props.round?.questionRevealed) {
      this.props.revealQuestion(this.props.game.id);
    }
  };

  handleCardClicked = (card: ICard) => {
    if (this.props.canSelectWinner) {
      const winner = this.props.round?.answers.find(answer => answer.card.id === card.id);
      if (winner) {
        this.props.setWinner(winner);
      }
    }
  };

  handleRevealAnswers = () => {
    if (this.props.game && this.props.playerIsRoundCzar) {
      this.props.revealAnswers(this.props.game.id);
    }
  };

  handleStartPlaying = () => {
    if (this.props.game) {
      this.props.startRound(this.props.game.id);
    }
  };

  render = () => {
    return this.props.round ? (
      <CurrentRound>
        <QuestionCardSpace>
          {this.props.round?.question && (
            <Card
              card={this.props.round.question}
              isHidden={!this.props.round.questionRevealed}
              onCardClick={this.handleRevealQuestion}
            />
          )}
        </QuestionCardSpace>
        <AnswerCardsSpace>
          <CardStack
            cards={this.props.round?.answers.map(answer => answer.card) || []}
            cardsHidden={!this.props.round?.answersRevealed}
            cardsClickable={this.props.canSelectWinner}
            onCardClick={this.handleCardClicked}
          />
        </AnswerCardsSpace>
      </CurrentRound>
    ) : (
      <StartGame onClickStart={this.handleStartPlaying} />
    );
  };
}

const CurrentRound: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const QuestionCardSpace: AnyStyledComponent = styled(Box)`
  && {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 250px;
    padding: 20px;
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
