import React from "react";
import { Container } from "@material-ui/core";

import Theme from "./Theme";
import { AnswerCard, QuestionCard } from "./components/Card";

class App extends React.Component {
  render = () => {
    return (
      <Theme>
        <Container maxWidth="md">
          <AnswerCard content="This is a answer card" />
          <QuestionCard content="This is a question card" />
        </Container>
      </Theme>
    );
  };
}

export default App;
