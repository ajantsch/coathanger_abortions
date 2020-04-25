import { IGame } from "../interfaces";
import { GameAction, GameActionTypes } from "../actions/game";

export default function(state: IGame | null = null, action: GameAction) {
  switch (action.type) {
    case GameActionTypes.RESET_GAME:
      return null;
    case GameActionTypes.GET_GAME:
      return action.payload;
    case GameActionTypes.START_GAME:
      return action.payload;
    case GameActionTypes.REMOTE_PLAYER_JOINED:
      return state ? { ...state, players: [...state.players, action.payload] } : null;
    default:
      return state;
  }
}
