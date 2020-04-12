import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../services/api/game";
import Card from "./Card";

interface ICardStackProps {
  cards: ICard[];
  onCardClick?: (card: ICard) => void;
}

class CardStack extends React.Component<ICardStackProps, {}> {
  handleCardClicked = (card: ICard) => {
    if (this.props.onCardClick) {
      this.props.onCardClick(card);
    }
  };

  render = () => {
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
        {this.props.cards.map(card => (
          <CardBox key={card.id} display="flex">
            <Card id={card.id} type={card.type} content={card.content} onCardClick={this.handleCardClicked} />
          </CardBox>
        ))}
      </Box>
    );
  };
}

const CardBox: AnyStyledComponent = styled(Box)`
  && {
    margin-bottom: -220px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export default CardStack;
