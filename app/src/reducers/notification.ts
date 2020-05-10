import { NotificationAction, NotificationActionTypes } from "../actions/notification";

const initialState = {
  text: "",
  visible: false,
};

export default function(state = initialState, action: NotificationAction) {
  switch (action.type) {
    case NotificationActionTypes.SHOW_NOTIFICATION:
      return { ...state, text: action.payload, visible: true };
    case NotificationActionTypes.HIDE_NOTIFICATION:
      return { ...state, visible: false };
    case NotificationActionTypes.RESET_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
}
