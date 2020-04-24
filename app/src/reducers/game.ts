import { IGame, IGivenAnswer } from "../interfaces";
import { GameAction, GameActionTypes } from "../actions/game";

function winnerReceived(state: IGame | null, winner: IGivenAnswer) {
  if (!state) {
    return state;
  }
  const playerIndex = state.players.map(player => player.id).indexOf(winner.player);
  const players = [...state.players];
  const updatedPlayer = state.players[playerIndex];
  updatedPlayer.wonCards = [...updatedPlayer.wonCards, winner.card];
  players[playerIndex] = updatedPlayer;
  return { ...state, players, currentRound: { ...state.currentRound, winner } };
}

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
    case GameActionTypes.CZAR_SET:
      return state ? { ...state, czar: action.payload } : null;
    case GameActionTypes.DRAW_QUESTION:
      return state ? { ...state, currentRound: { ...state.currentRound, question: action.payload } } : null;
    case GameActionTypes.RECEIVE_QUESTION:
      return state ? { ...state, currentRound: { ...state.currentRound, question: action.payload } } : null;
    case GameActionTypes.RECEIVE_ANSWER:
      return state
        ? {
            ...state,
            currentRound: { ...state.currentRound, answers: [...state.currentRound.answers, action.payload] },
          }
        : null;
    case GameActionTypes.REVEAL_ANSWERS: {
      return state
        ? {
            ...state,
            currentRound: { ...state.currentRound, answersRevealed: true },
          }
        : null;
    }
    case GameActionTypes.RECEIVE_ANSWERS_REVEALED:
      return state
        ? {
            ...state,
            currentRound: action.payload,
          }
        : null;
    case GameActionTypes.RECEIVE_WINNER:
      return winnerReceived(state, action.payload);
    default:
      return state;
  }
}
