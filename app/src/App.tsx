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

import JoinLayout from "./components/JoinLayout";
import NewGame from "./pages/NewGame";
import EnterGame from "./pages/EnterGame";
import PlayGame from "./pages/PlayGame";

const reduxMiddleware = [thunk, createLogger()];
const store = createStore(
  rootReducer,
  load({ states: ["game", "player", "round"], namespace: "coathanger_abortions", disableWarnings: true }),
  composeWithDevTools(
    applyMiddleware(
      ...reduxMiddleware,
      save({ states: ["game", "player", "round"], namespace: "coathanger_abortions" }),
    ),
  ),
);

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path={["/", "/:game_id/join"]} exact default>
                <JoinLayout>
                  <Route path="/" exact component={NewGame} />
                  <Route path="/:game_id/join" exact component={EnterGame} />
                </JoinLayout>
              </Route>
              <Route path="/:game_id/" exact component={PlayGame} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  };
}

export default App;
