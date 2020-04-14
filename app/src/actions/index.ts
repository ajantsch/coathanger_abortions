import { GameActionTypes } from "./game";

import {
  getGame,
  startGame,
  joinGame,
  remotePlayerJoined,
  czarSet,
  drawQuestion,
  giveAnswer,
  setWinner,
  answerReceived,
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
  joinGame,
  remotePlayerJoined,
  czarSet,
  drawQuestion,
  giveAnswer,
  setWinner,
  answerReceived,
  winnerReceived,
};
