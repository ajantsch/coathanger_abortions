import { StatusActionTypes } from "./status";
import { GameActionTypes } from "./game";
import { PlayerActionTypes } from "./player";
import { RoundActionTypes } from "./round";
import { NotificationActionTypes } from "./notification";
import { SocketActionTypes } from "./socket";

import { gameLoaded, playerLoaded, resetStatus } from "./status";
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
import { resetPlayer, getPlayer, joinGame, pausePlaying, resumePlaying, leaveGame, giveAnswer } from "./player";
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
import { showNotification, hideNotification, resetNotification } from "./notification";
import { connectSocket, disconnectSocket } from "./socket";

export type ActionTypes =
  | StatusActionTypes
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
  gameLoaded,
  playerLoaded,
  resetStatus,
  resetGame,
  getGame,
  startGame,
  resetPlayer,
  getPlayer,
  joinGame,
  pausePlaying,
  resumePlaying,
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
  resetNotification,
  connectSocket,
  disconnectSocket,
};
