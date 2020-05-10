import { SocketAction, SocketActionTypes } from "../actions/socket";

const initialState = { connected: false };

export default function(state = initialState, action: SocketAction) {
  switch (action.type) {
    case SocketActionTypes.CONNECT_SOCKET:
      return { connected: true };
    case SocketActionTypes.DISCONNECT_SOCKET:
      return { connected: false };
    default:
      return state;
  }
}
