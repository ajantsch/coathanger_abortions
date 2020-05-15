import { createSelector } from "reselect";

import { AppState } from "../reducers";

const getPlayers = (state: AppState) => state.game?.players;
const getRoundAnswers = (state: AppState) => state.round?.answers;
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

export const getRoundWinnerName = createSelector([getRoundWinner, getPlayers], (roundWinner, players) => {
  if (!players || !roundWinner) {
    return "";
  }
  const winningPlayer = players.find(player => player.id === roundWinner);
  if (!winningPlayer) {
    return "";
  }
  return winningPlayer?.name;
});

export const canGiveAnswer = createSelector([getRoundAnswers, getPlayerId], (answers, playerId) => {
  if (answers && !!answers.find(answer => answer.player === playerId)) {
    return false;
  }
  return true;
});

export const otherPlayersAnswerCards = createSelector([getRoundAnswers, getPlayerId], (answers, playerId) => {
  if (!answers) {
    return [];
  }
  return answers.filter(answer => answer.player !== playerId).map(answer => answer.card);
});

export const allAnswersAreIn = createSelector(
  [getActivePlayers, getRoundCzar, getRoundAnswers],
  (players, czar, roundAnswers) => {
    if (!players || !czar || !roundAnswers || !roundAnswers.length) {
      return false;
    }
    return players.filter(player => player.id !== czar).length <= roundAnswers.length;
  },
);

export const canSelectWinner = createSelector(
  [playerIsRoundCzar, allAnswersAreIn, getRoundWinner],
  (isCzar, allAnswersIn, winner) => {
    return isCzar && allAnswersIn && !winner;
  },
);

export const shouldShowRevealAnswerAction = createSelector(
  [playerIsRoundCzar, allAnswersAreIn, getRoundAnswersRevealed],
  (isCzar, allAnswersIn, answersRevealed) => {
    return isCzar && allAnswersIn && !answersRevealed;
  },
);
