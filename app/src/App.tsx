import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import socket from "socket.io-client";

import Theme from "./Theme";
import Start from "./components/Start";
import Game from "./components/Game";

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
      <Theme>
        <Container maxWidth="md">
          <Router>
            <Switch>
              <Route path="/" exact default>
                <Start />
              </Route>
              <Route path="/:game_id/">
                <Game />
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </Router>
        </Container>
      </Theme>
    );
  };
}

export default App;
