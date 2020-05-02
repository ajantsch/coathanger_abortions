import { IGame } from "../interfaces";
import { GameAction, GameActionTypes } from "../actions/game";

export default function(state: IGame | null = null, action: GameAction) {
  switch (action.type) {
    case GameActionTypes.VOID:
      return state;
    case GameActionTypes.RESET_GAME:
      return null;
    case GameActionTypes.GET_GAME:
      return action.payload;
    case GameActionTypes.START_GAME:
      return action.payload;
    case GameActionTypes.REMOTE_PLAYER_JOINED:
      return state ? { ...state, players: [...state.players, action.payload] } : null;
    case GameActionTypes.REMOTE_PLAYER_ACTIVE:
      return state
        ? {
            ...state,
            players: state.players.map(player =>
              player.id === action.payload.id ? { ...player, active: true } : player,
            ),
          }
        : null;
    case GameActionTypes.REMOTE_PLAYER_INACTIVE:
      return state
        ? {
            ...state,
            players: state.players.map(player =>
              player.id === action.payload.id ? { ...player, active: false } : player,
            ),
          }
        : null;
    case GameActionTypes.REMOTE_PLAYER_REMOVED:
      return state ? { ...state, players: state.players.filter(player => player.id !== action.payload) } : null;
    case GameActionTypes.ASSIGN_WINNING_CARD:
      return state
        ? {
            ...state,
            players: [
              ...state.players.map(player => {
                if (player.id === action.payload.playerId) {
                  return { ...player, wonCards: [...player.wonCards, action.payload.question] };
                }
                return player;
              }),
            ],
          }
        : null;
    default:
      return state;
  }
}
