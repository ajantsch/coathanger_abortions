import React from "react";
import { Container } from "@material-ui/core";

import Theme from "./Theme";
import { BlackCard, WhiteCard } from "./components/Card";

class App extends React.Component {
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
