import { combineReducers } from "redux";

import game from "./game";
import player from "./player";

const rootReducer = combineReducers({ game, player });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
