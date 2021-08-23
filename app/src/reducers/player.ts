import { IPlayer } from "../interfaces";
import { PlayerAction, PlayerActionTypes } from "../actions/player";

export default function(state: IPlayer | null = null, action: PlayerAction) {
  switch (action.type) {
    case PlayerActionTypes.VOID:
      return state;
    case PlayerActionTypes.RESET_PLAYER:
      return null;
    case PlayerActionTypes.GET_PLAYER:
      return action.payload;
    case PlayerActionTypes.JOIN_GAME:
      return action.payload;
    case PlayerActionTypes.PAUSE_PLAYING:
      return state ? { ...state, active: false } : null;
    case PlayerActionTypes.RESUME_PLAYING:
      return state ? { ...state, active: true } : null;
    case PlayerActionTypes.LEAVE_GAME:
      return null;
    case PlayerActionTypes.GIVE_ANSWER:
      return state
        ? { ...state, activeCards: [...state.activeCards].filter(card => card.id !== action.payload.card.id) }
        : null;
    case PlayerActionTypes.DRAW_ANSWER:
      return state ? { ...state, activeCards: [action.payload, ...state.activeCards] } : null;
    case PlayerActionTypes.REPLACE_CARD:
      return state ? { ...state, activeCards: action.payload } : null;
    case PlayerActionTypes.RECEIVE_WON_QUESTION:
      return state ? { ...state, wonCards: [action.payload, ...state.wonCards] } : null;
    default:
      return state;
  }
}
