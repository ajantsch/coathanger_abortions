import { IRound } from "../interfaces";
import { RoundAction, RoundActionTypes } from "../actions/round";

import { shuffle } from "../utils";

export default function(state: IRound | null = null, action: RoundAction) {
  switch (action.type) {
    case RoundActionTypes.START_ROUND:
      return action.payload;
    case RoundActionTypes.GET_CURRENT_ROUND:
      return action.payload;
    case RoundActionTypes.RECEIVE_ROUND:
      return action.payload;
    case RoundActionTypes.REVEAL_QUESTION:
      return state ? { ...state, questionRevealed: true } : null;
    case RoundActionTypes.RECEIVE_QUESTION_REVEALED:
      return state ? { ...state, questionRevealed: true } : null;
    case RoundActionTypes.RECEIVE_ANSWER:
      return state ? { ...state, answers: [...state.answers, action.payload] } : null;
    case RoundActionTypes.REVEAL_ANSWERS:
      return state ? { ...state, answersRevealed: true, answers: shuffle(state.answers) } : null;
    case RoundActionTypes.RECEIVE_ANSWERS_REVEALED:
      return state ? { ...state, answersRevealed: true, answers: shuffle(state.answers) } : null;
    case RoundActionTypes.RECEIVE_WINNER:
      return state ? { ...state, winner: action.payload } : null;
    default:
      return state;
  }
}
