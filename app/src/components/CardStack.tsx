import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../services/api/game";
import Card from "./Card";

interface ICardStackProps {
  cards: ICard[];
  cardsHidden?: boolean;
  condensed?: boolean;
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
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {this.props.cards.map(card => (
          <CardBox key={card.id} display="flex" className={this.props.condensed && "condensed"}>
            <Card
              id={card.id}
              type={card.type}
              content={card.content}
              isHidden={this.props.cardsHidden}
              onCardClick={this.handleCardClicked}
            />
          </CardBox>
        ))}
      </Box>
    );
  };
}

const CardBox: AnyStyledComponent = styled(Box)`
  && {
    margin-bottom: -250px;
    transition: margin-right 1s;

    &.condensed {
      margin-right: -200px;
    }

    &:last-of-type {
      margin-bottom: 0;

      &.condensed {
        margin-right: 0;
      }
    }
  }
`;

export default CardStack;
