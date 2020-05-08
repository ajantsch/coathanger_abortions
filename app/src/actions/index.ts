import { GameActionTypes } from "./game";
import { PlayerActionTypes } from "./player";
import { RoundActionTypes } from "./round";
import { NotificationActionTypes } from "./notification";
import { SocketActionTypes } from "./socket";
import {
  resetGame,
  getGame,
  startGame,
  remotePlayerJoined,
  remotePlayerActive,
  remotePlayerInactive,
  remotePlayerRemoved,
  assignWinningCard,
} from "./game";
import { resetPlayer, getPlayer, joinGame, leaveGame, giveAnswer } from "./player";
import {
  resetRound,
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
import { showNotification, hideNotification } from "./notification";
import { connectSocket, disconnectSocket } from "./socket";

export type ActionTypes =
  | GameActionTypes
  | PlayerActionTypes
  | RoundActionTypes
  | NotificationActionTypes
  | SocketActionTypes;

export interface IBaseAction {
  type: ActionTypes;
  payload?: unknown;
}

export default {
  resetGame,
  getGame,
  startGame,
  resetPlayer,
  getPlayer,
  joinGame,
  leaveGame,
  resetRound,
  startNewRound,
  getCurrentRound,
  roundReceived,
  remotePlayerJoined,
  remotePlayerActive,
  remotePlayerInactive,
  remotePlayerRemoved,
  revealQuestion,
  giveAnswer,
  revealAnswers,
  setWinner,
  questionRevealed,
  answerReceived,
  answersRevealed,
  winnerReceived,
  assignWinningCard,
  showNotification,
  hideNotification,
  connectSocket,
  disconnectSocket,
};
