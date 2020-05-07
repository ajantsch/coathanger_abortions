import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import thunk from "redux-thunk";
import { load, save } from "redux-localstorage-simple";

import rootReducer from "./reducers";

const reduxMiddleware = [thunk, reduxLogger];
const store = createStore(
  rootReducer,
  load({ namespace: "coathanger_abortions" }),
  composeWithDevTools(applyMiddleware(...reduxMiddleware, save({ namespace: "coathanger_abortions" }))),
);

export default store;
