import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";
import socket from "socket.io-client";

import Theme from "./Theme";
import Create from "./components/Create";
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
        <Container maxWidth="lg">
          <CenterBox>
            <Router>
              <Switch>
                <Route path="/" exact default>
                  <Create />
                </Route>
                <Route path="/:game_id/">
                  <Game />
                </Route>
                <Redirect to="/"></Redirect>
              </Switch>
            </Router>
          </CenterBox>
        </Container>
      </Theme>
    );
  };
}

const CenterBox: AnyStyledComponent = styled(Box)`
  && {
    padding: 20px 0;
    margin: 0 auto;
  }
`;

export default App;
