import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import socket from "socket.io-client";

import store from "./store";
import theme from "./Theme";

import NewGame from "./pages/NewGame";
import JoinGame from "./pages/JoinGame";
import PlayGame from "./pages/PlayGame";

const { SOCKET_URL } = process.env;

class App extends React.Component {
  componentDidMount() {
    if (SOCKET_URL) {
      socket(SOCKET_URL).on("connected", () => {
        console.log("Socket connection to service established");
      });
    }
  }

  render = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/" exact default component={NewGame} />
              <Route path="/:game_id/join" exact component={JoinGame} />
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
