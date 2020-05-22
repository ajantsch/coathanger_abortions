import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { load, save } from "redux-localstorage-simple";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import ReactGA from "react-ga";

import { touchSupported } from "./utils";
import rootReducer from "./reducers";
import theme from "./Theme";
import { AppContext } from "./AppContext";

import NewGame from "./pages/NewGame";
import GameManager from "./pages/GameManager";

const { NODE_ENV, GA_TRACKING_ID } = process.env;
const reduxLocalStorageSettings = { states: ["game", "player", "round"], namespace: "coathanger_abortions" };

const store = createStore(
  rootReducer,
  load({ ...reduxLocalStorageSettings, disableWarnings: true }),
  NODE_ENV === "production"
    ? applyMiddleware(thunk, save(reduxLocalStorageSettings))
    : composeWithDevTools(applyMiddleware(thunk, createLogger(), save(reduxLocalStorageSettings))),
);

class App extends React.Component {
  componentDidMount = () => {
    if (GA_TRACKING_ID) {
      ReactGA.initialize(GA_TRACKING_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  };

  render = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContext.Provider value={{ touchSupported: touchSupported() }}>
            <Router>
              <Switch>
                <Route path="/" exact component={NewGame} />
                <Route path="/:game_id/" component={GameManager} />
                <Redirect to="/" />
              </Switch>
            </Router>
          </AppContext.Provider>
        </ThemeProvider>
      </Provider>
    );
  };
}

export default App;
