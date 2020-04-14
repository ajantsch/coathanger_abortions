import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import thunk from "redux-thunk";
import { load, save } from "redux-localstorage-simple";

import rootReducer from "./reducers";

const reduxMiddleware = [reduxLogger, thunk];
const store = createStore(rootReducer, load(), composeWithDevTools(applyMiddleware(...reduxMiddleware, save())));

export default store;
