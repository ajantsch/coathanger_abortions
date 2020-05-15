import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import { AppState } from "../reducers";
import actions from "../actions";
import { playerIsRoundCzar, canSelectWinner, otherActivePlayersAnswerCards } from "../selectors";

import CardCombo from "../components/CardCombo";
import CardStack from "../components/CardStack";
import StartGame from "../components/StartGame";

const mapStateToProps = (state: AppState) => ({
  game: state.game,
  round: state.round,
  playerId: state.player?.id,
  playerIsRoundCzar: playerIsRoundCzar(state),
  canSelectWinner: canSelectWinner(state),
  otherActivePlayersAnswerCards: otherActivePlayersAnswerCards(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
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
            <StyledCardCombo
              question={this.props.round.question}
              answer={this.props.round.answers.find(answer => answer.player === this.props.playerId)?.card}
              showAnswerPlaceholder={!this.props.playerIsRoundCzar}
              answerPlaceholderText={"your answer will show up here"}
            />
          )}
        </QuestionCardSpace>
        <AnswerCardsSpace>
          <CardStack
            cards={this.props.otherActivePlayersAnswerCards}
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

const StyledCardCombo: AnyStyledComponent = styled(CardCombo)`
  && {
    padding: 20px 0;
  }
`;

const AnswerCardsSpace: AnyStyledComponent = styled(Box)`
  && {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 250px;
    padding: 20px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(GameRound);
