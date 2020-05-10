import { StatusAction, StatusActionTypes } from "../actions/status";

const initialState = {
  gameLoaded: false,
  playerLoaded: false,
};

export default function(state = initialState, action: StatusAction) {
  switch (action.type) {
    case StatusActionTypes.GAME_LOADED:
      return { ...state, gameLoaded: true };
    case StatusActionTypes.PLAYER_LOADED:
      return { ...state, playerLoaded: true };
    case StatusActionTypes.RESET_STATUS:
      return initialState;
    default:
      return state;
  }
}
