import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { load, save } from "redux-localstorage-simple";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import rootReducer from "./reducers";
import theme from "./Theme";

import NewGame from "./pages/NewGame";
import GameManager from "./pages/GameManager";

const { NODE_ENV } = process.env;
const reduxLocalStorageSettings = { states: ["game", "player", "round"], namespace: "coathanger_abortions" };

const store = createStore(
  rootReducer,
  load({ ...reduxLocalStorageSettings, disableWarnings: true }),
  NODE_ENV === "production"
    ? applyMiddleware(thunk, save(reduxLocalStorageSettings))
    : composeWithDevTools(applyMiddleware(thunk, createLogger(), save(reduxLocalStorageSettings))),
);

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/" exact component={NewGame} />
              <Route path="/:game_id/" component={GameManager} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  };
}

export default App;
