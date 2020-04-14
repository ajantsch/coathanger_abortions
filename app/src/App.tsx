import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import store from "./store";

import Theme from "./Theme";
import NewGame from "./pages/NewGame";
import JoinGame from "./pages/JoinGame";
import PlayGame from "./pages/PlayGame";

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <Theme>
          <Container maxWidth="lg">
            <CenterBox>
              <Router>
                <Switch>
                  <Route path="/" exact default component={NewGame} />
                  <Route path="/:game_id/join" component={JoinGame} />
                  <Route path="/:game_id/" component={PlayGame} />
                  <Redirect to="/" />
                </Switch>
              </Router>
            </CenterBox>
          </Container>
        </Theme>
      </Provider>
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
