import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import Card from "./Card";

interface ICardStackProps {
  cards: ICard[];
  cardsHidden?: boolean;
  condensed?: boolean;
  onCardClick?: (card: ICard) => void;
}

class CardStack extends React.PureComponent<ICardStackProps, {}> {
  handleCardClicked = (card: ICard) => {
    if (this.props.onCardClick) {
      this.props.onCardClick(card);
    }
  };

  render = () => {
    return (
      <CardBoxWrapper>
        {this.props.cards.map(card => (
          <CardBox key={card.id} className={this.props.condensed && "condensed"}>
            <Card card={card} isHidden={this.props.cardsHidden} onCardClick={this.handleCardClicked} />
          </CardBox>
        ))}
      </CardBoxWrapper>
    );
  };
}

const CardBoxWrapper: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
  }
`;

const CardBox: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
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
