import { GameActionTypes } from "./game";
import { PlayerActionTypes } from "./player";
import { RoundActionTypes } from "./round";

import { getGame, startGame, remotePlayerJoined } from "./game";

import { getPlayer, joinGame, giveAnswer } from "./player";

import {
  startNewRound,
  getCurrentRound,
  roundReceived,
  revealQuestion,
  revealAnswers,
  setWinner,
  questionRevealed,
  answerReceived,
  answersRevealed,
  winnerReceived,
} from "./round";

export type ActionTypes = GameActionTypes | PlayerActionTypes | RoundActionTypes;

export interface IBaseAction {
  type: ActionTypes;
  payload?: unknown;
}

export default {
  getGame,
  startGame,
  getPlayer,
  joinGame,
  startNewRound,
  getCurrentRound,
  roundReceived,
  remotePlayerJoined,
  revealQuestion,
  giveAnswer,
  revealAnswers,
  setWinner,
  questionRevealed,
  answerReceived,
  answersRevealed,
  winnerReceived,
};
