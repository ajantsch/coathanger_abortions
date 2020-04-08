import React from "react";

import Card from "./Card";

interface IPlayerCardsProps {
  cards: { id: string; content: string }[];
}

class PlayerCards extends React.PureComponent<IPlayerCardsProps, {}> {
  render = () => {
    return this.props.cards.map(card => (
      <Card key={card.id} type="answer" content={card.content} />
    ));
  };
}

export default PlayerCards;
