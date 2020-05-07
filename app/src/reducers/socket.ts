import { ISocketStatus } from "../interfaces";
import { SocketAction, SocketActionTypes } from "../actions/socket";

export default function(state: ISocketStatus = { connected: false }, action: SocketAction) {
  switch (action.type) {
    case SocketActionTypes.CONNECT_SOCKET:
      return { connected: true };
    case SocketActionTypes.DISCONNECT_SOCKET:
      return { connected: false };
    default:
      return state;
  }
}
