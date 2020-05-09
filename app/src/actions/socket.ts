import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { AppState } from "../reducers";
import { IBaseAction } from "./index";
import GameSocket from "../services/socket";

let SOCKET: SocketIOClient.Socket | undefined = undefined;

export enum SocketActionTypes {
  CONNECT_SOCKET = "CONNECT_SOCKET",
  DISCONNECT_SOCKET = "DISCONNECT_SOCKET",
}

export interface IConnectSocketAction extends IBaseAction {
  type: SocketActionTypes.CONNECT_SOCKET;
}

export interface IDisconnectSocketAction extends IBaseAction {
  type: SocketActionTypes.DISCONNECT_SOCKET;
}

export type SocketAction = IConnectSocketAction | IDisconnectSocketAction;

export function connectSocket(
  gameId: string,
  playerId: string,
): ThunkAction<Promise<IConnectSocketAction>, AppState, undefined, IConnectSocketAction> {
  return async (dispatch: ThunkDispatch<AppState, undefined, IConnectSocketAction>) => {
    SOCKET = await GameSocket.connectToGame(gameId, playerId, dispatch);
    return dispatch({
      type: SocketActionTypes.CONNECT_SOCKET,
    });
  };
}

export function disconnectSocket(): IDisconnectSocketAction {
  GameSocket.disconnectFromGame(SOCKET);
  return {
    type: SocketActionTypes.DISCONNECT_SOCKET,
  };
}
