import React from "react";
import { Container } from "@material-ui/core";
import io from "socket.io-client";

import Theme from "./Theme";
import { BlackCard, WhiteCard } from "./components/Card";

const { SOCKET_URL } = process.env;

class App extends React.Component {
  componentDidMount() {
    io(SOCKET_URL as string);
  }

  render = () => {
    return (
      <Theme>
        <Container maxWidth="md">
          <BlackCard content="This is a question card" />
          <WhiteCard content="This is a answer card" />
        </Container>
      </Theme>
    );
  };
}

export default App;
