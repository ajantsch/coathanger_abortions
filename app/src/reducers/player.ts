import { IPlayer } from "../interfaces";
import { PlayerAction, PlayerActionTypes } from "../actions/player";

export const initialState: IPlayer | null = null;

export default function(state: IPlayer | null = initialState, action: PlayerAction) {
  switch (action.type) {
    case PlayerActionTypes.VOID:
      return state;
    case PlayerActionTypes.GET_PLAYER:
      return action.payload;
    case PlayerActionTypes.JOIN_GAME:
      return action.payload;
    case PlayerActionTypes.GIVE_ANSER:
      return state
        ? { ...state, activeCards: [...state.activeCards].filter(card => card.id !== action.payload.card.id) }
        : null;
    default:
      return state;
  }
}
