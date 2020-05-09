import { StatusActionTypes } from "./status";
import { GameActionTypes } from "./game";
import { PlayerActionTypes } from "./player";
import { RoundActionTypes } from "./round";
import { NotificationActionTypes } from "./notification";
import { SocketActionTypes } from "./socket";

import statusActions from "./status";
import gameActions from "./game";
import playerActions from "./player";
import roundActions from "./round";
import notificationActions from "./notification";
import socketActions from "./socket";

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
  ...statusActions,
  ...playerActions,
  ...gameActions,
  ...roundActions,
  ...notificationActions,
  ...socketActions,
};
