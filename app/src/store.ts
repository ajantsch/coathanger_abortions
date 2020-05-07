import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const reduxMiddleware = [thunk, reduxLogger];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...reduxMiddleware)));

export default store;
