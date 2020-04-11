import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import Card from "./Card";

interface IPlayerCardsProps {
  cards: { id: string; content: string }[];
}

class PlayerCards extends React.PureComponent<IPlayerCardsProps, {}> {
  render = () => {
    return (
      <CardStack className="card-stack">
        {this.props.cards.map(card => (
          <Card key={card.id} type="answer" content={card.content} />
        ))}
      </CardStack>
    );
  };
}

const CardStack: AnyStyledComponent = styled.div`
  overflow: hidden;
  padding: 20px 0;
  margin: 0 -20px;

  > .card {
    float: left;
    margin: 0 20px -220px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export default PlayerCards;
