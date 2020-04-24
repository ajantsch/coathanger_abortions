import { IGame, IGivenAnswer } from "../interfaces";
import { GameAction, GameActionTypes } from "../actions/game";

export const initialState: IGame = {
  id: undefined,
  players: [],
  czar: undefined,
  currentRound: {
    question: undefined,
    answers: [],
    answersRevealed: false,
    winner: undefined,
  },
};

function winnerReceived(state: IGame, winner: IGivenAnswer) {
  const playerIndex = state.players.map(player => player.id).indexOf(winner.player);
  const players = [...state.players];
  const updatedPlayer = state.players[playerIndex];
  updatedPlayer.wonCards = [...updatedPlayer.wonCards, winner.card];
  players[playerIndex] = updatedPlayer;
  return { ...state, players, currentRound: { ...state.currentRound, winner } };
}

export default function(state: IGame = initialState, action: GameAction) {
  switch (action.type) {
    case GameActionTypes.GET_GAME:
      return action.payload;
    case GameActionTypes.START_GAME:
      return action.payload;
    case GameActionTypes.REMOTE_PLAYER_JOINED:
      return { ...state, players: [...state.players, action.payload] };
    case GameActionTypes.CZAR_SET:
      return { ...state, czar: action.payload };
    case GameActionTypes.DRAW_QUESTION:
      return { ...state, currentRound: { ...state.currentRound, question: action.payload } };
    case GameActionTypes.RECEIVE_QUESTION:
      return { ...state, currentRound: { ...state.currentRound, question: action.payload } };
    case GameActionTypes.RECEIVE_ANSWER:
      return {
        ...state,
        currentRound: { ...state.currentRound, answers: [...state.currentRound.answers, action.payload] },
      };
    case GameActionTypes.REVEAL_ANSWERS: {
      return {
        ...state,
        currentRound: { ...state.currentRound, answersRevealed: true },
      };
    }
    case GameActionTypes.RECEIVE_ANSWERS_REVEALED:
      return {
        ...state,
        currentRound: action.payload,
      };
    case GameActionTypes.RECEIVE_WINNER:
      return winnerReceived(state, action.payload);
    default:
      return state;
  }
}
