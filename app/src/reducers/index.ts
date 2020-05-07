import { combineReducers } from "redux";

import game from "./game";
import player from "./player";
import round from "./round";
import notification from "./notification";

const rootReducer = combineReducers({ game, player, round, notification });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
