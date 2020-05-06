import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import store from "./store";
import theme from "./Theme";

import NewGame from "./pages/NewGame";
import EnterGame from "./pages/EnterGame";
import PlayGame from "./pages/PlayGame";

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/" exact default component={NewGame} />
              <Route path="/:game_id/join" exact component={EnterGame} />
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
