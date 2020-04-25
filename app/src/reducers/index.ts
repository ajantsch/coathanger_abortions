import { combineReducers } from "redux";

import game from "./game";
import player from "./player";
import round from "./round";

const rootReducer = combineReducers({ game, player, round });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
