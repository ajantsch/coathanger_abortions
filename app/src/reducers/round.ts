import { IRound } from "../interfaces";
import { RoundAction, RoundActionTypes } from "../actions/round";

import { shuffle } from "../utils";

export default function(state: IRound | null = null, action: RoundAction) {
  switch (action.type) {
    case RoundActionTypes.RESET_ROUND:
      return null;
    case RoundActionTypes.START_ROUND:
      return action.payload;
    case RoundActionTypes.GET_CURRENT_ROUND:
      return action.payload;
    case RoundActionTypes.RECEIVE_ROUND:
      return action.payload;
    case RoundActionTypes.RECEIVE_ANSWER:
      return state ? { ...state, answers: [...state.answers, action.payload] } : null;
    case RoundActionTypes.REVEAL_ANSWERS:
      return { ...action.payload, answers: shuffle(action.payload.answers) };
    case RoundActionTypes.RECEIVE_ANSWERS_REVEALED:
      return { ...action.payload, answers: shuffle(action.payload.answers) };
    case RoundActionTypes.RECEIVE_WINNER:
      return state ? { ...state, winner: action.payload } : null;
    default:
      return state;
  }
}
