import { createSelector } from "reselect";

import { AppState } from "../reducers";

const getPlayers = (state: AppState) => state.game?.players;
const getRoundAnswers = (state: AppState) => state.round?.answers;
const getRoundQuestionRevealed = (state: AppState) => state.round?.questionRevealed;
const getRoundAnswersRevealed = (state: AppState) => state.round?.answersRevealed;
const getPlayerId = (state: AppState) => state.player?.id;
const getRoundCzar = (state: AppState) => state.round?.czar;
const getRoundWinner = (state: AppState) => state.round?.winner?.player;

export const playerIsRoundWinner = createSelector([getPlayerId, getRoundWinner], (playerId, roundWinner) => {
  return !!playerId && !!roundWinner && playerId === roundWinner;
});

export const playerIsRoundCzar = createSelector([getPlayerId, getRoundCzar], (playerId, roundCzar) => {
  return !!playerId && !!roundCzar && playerId === roundCzar;
});

export const getActivePlayers = createSelector([getPlayers], players => {
  if (!players) {
    return [];
  }
  return players.filter(player => player.active);
});

export const canGiveAnswer = createSelector(
  [getRoundQuestionRevealed, getRoundAnswers, getPlayerId],
  (questionRevealed, answers, playerId) => {
    if (!questionRevealed || (answers && !!answers.find(answer => answer.player === playerId))) {
      return false;
    }
    return true;
  },
);

export const allAnswersAreIn = createSelector(
  [getActivePlayers, getRoundCzar, getRoundAnswers],
  (players, czar, roundAnswers) => {
    if (!players || !czar || !roundAnswers || !roundAnswers.length) {
      return false;
    }
    return players.filter(player => player.id !== czar).length <= roundAnswers.length;
  },
);

export const shouldShowRevealAnswerAction = createSelector(
  [playerIsRoundCzar, allAnswersAreIn, getRoundAnswersRevealed],
  (isCzar, allAnswersIn, answersRevealed) => {
    return isCzar && allAnswersIn && !answersRevealed;
  },
);
