import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import io from "socket.io-client";

import Theme from "./Theme";
import { Start } from "./components/Start";
import { Game } from "./components/Game";

const { SOCKET_URL } = process.env;

class App extends React.Component {
  componentDidMount() {
    io(SOCKET_URL as string);
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
