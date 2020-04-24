import { GameActionTypes } from "./game";
import { PlayerActionTypes } from "./player";

import {
  getGame,
  startGame,
  remotePlayerJoined,
  czarSet,
  drawQuestion,
  revealAnswers,
  setWinner,
  questionReceived,
  answerReceived,
  answersRevealed,
  winnerReceived,
} from "./game";

import { getPlayer, joinGame, giveAnswer } from "./player";

export type ActionTypes = GameActionTypes | PlayerActionTypes;

export interface IBaseAction {
  type: ActionTypes;
  payload?: unknown;
}

export default {
  getGame,
  startGame,
  getPlayer,
  joinGame,
  remotePlayerJoined,
  czarSet,
  drawQuestion,
  giveAnswer,
  revealAnswers,
  setWinner,
  questionReceived,
  answerReceived,
  answersRevealed,
  winnerReceived,
};
