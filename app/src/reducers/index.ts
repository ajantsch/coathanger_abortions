import { combineReducers } from "redux";

import status from "./status";
import game from "./game";
import player from "./player";
import round from "./round";
import notification from "./notification";
import socket from "./socket";

const rootReducer = combineReducers({ status, game, player, round, notification, socket });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
