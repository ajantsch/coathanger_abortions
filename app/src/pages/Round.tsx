import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Box, Button } from "@material-ui/core";

import { ICard } from "../interfaces";
import { AppState } from "../reducers";
import actions from "../actions";

import Card from "../components/Card";
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

class Round extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>, {}> {
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
      this.props.game.currentRound.answers.length === this.props.game.players.length - 1 &&
      !this.props.game.currentRound.answersRevealed;
    return (
      <>
        {showDrawQuestionButton && (
          <Button variant="contained" color="primary" onClick={this.handleDrawQuestion}>
            Draw question card
          </Button>
        )}
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          <Box flexGrow={0} flexShrink={0} flexBasis={250}>
            {this.props.game.currentRound.question ? <Card card={this.props.game.currentRound.question} /> : <></>}
          </Box>
          <Box flexGrow={1} flexShrink={0} flexBasis={250}>
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
          </Box>
        </Box>
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Round);
