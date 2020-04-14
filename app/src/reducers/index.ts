import { combineReducers } from "redux";

import game from "./game";

const rootReducer = combineReducers({ game });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
