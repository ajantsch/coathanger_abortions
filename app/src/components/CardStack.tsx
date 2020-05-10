import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import Card from "./Card";

interface ICardStackProps {
  cards: ICard[];
  cardsHidden?: boolean;
  cardsClickable: boolean;
  condensed?: boolean;
  onCardClick?: (card: ICard) => void;
  winningCard?: string;
}

class CardStack extends React.PureComponent<ICardStackProps, {}> {
  handleCardClicked = (card: ICard) => {
    if (this.props.cardsClickable && this.props.onCardClick) {
      this.props.onCardClick(card);
    }
  };

  render = () => {
    return (
      <CardBoxWrapper className={this.props.condensed ? "condensed" : null}>
        {this.props.cards.map(card => (
          <CardBox key={card.id} className={this.props.condensed ? "condensed" : null}>
            <Card
              card={card}
              isHidden={this.props.cardsHidden}
              onCardClick={this.handleCardClicked}
              isWinningCard={card.id === this.props.winningCard}
            />
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
    transition: padding-right 1s ease-in-out;

    &.condensed {
      padding-right: 285px;
    }

    @media (min-width: 600px) {
      justify-content: space-between;
    }
  }
`;

const CardBox: AnyStyledComponent = styled(Box)`
  && {
    display: flex;
    padding: 20px;
    transition: margin-right 1s ease-in-out;

    &.condensed {
      margin-right: -285px;
    }
  }
`;

export default CardStack;
