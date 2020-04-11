import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../services/api/game";
import { GameApi } from "../services/api";

import Card from "./Card";

interface IPlayerCardsProps {
  gameId: string;
  playerId: string;
  cards: { id: string; content: string }[];
  cardSelectedCallback?: (card: ICard) => void;
}

class PlayerCards extends React.PureComponent<IPlayerCardsProps, {}> {
  handleCardSelected = async (card: ICard) => {
    const selectedCard = await GameApi.selectAnswerCard(
      this.props.gameId,
      this.props.playerId,
      card,
    );

    if (this.props.cardSelectedCallback) {
      this.props.cardSelectedCallback(selectedCard);
    }
  };

  render = () => {
    return (
      <CardStack className="card-stack">
        {this.props.cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            type="answer"
            content={card.content}
            onCardSelected={this.handleCardSelected}
          />
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
