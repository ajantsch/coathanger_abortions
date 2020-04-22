import { GameActionTypes } from "./game";

import {
  getGame,
  startGame,
  getGamePlayer,
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
} from "./game";

export type ActionTypes = GameActionTypes;

export interface IBaseAction {
  type: ActionTypes;
  payload?: unknown;
}

export default {
  getGame,
  startGame,
  getGamePlayer,
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
