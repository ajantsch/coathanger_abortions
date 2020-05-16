import React from "react";
import { Box } from "@material-ui/core";
import { Cached as Replace } from "@material-ui/icons";
import styled, { AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import Card from "./Card";

interface ICardStackProps {
  cards: ICard[];
  cardsHidden?: boolean;
  cardsClickable: boolean;
  condensed?: boolean;
  onCardClick?: (card: ICard) => void;
  cardsReplaceable?: boolean;
  onCardReplaceClick?: (cardId: string) => void;
  touchSupported?: boolean;
  className?: string;
}

class CardStack extends React.PureComponent<ICardStackProps, {}> {
  handleCardClicked = (card: ICard) => {
    if (this.props.cardsClickable && this.props.onCardClick) {
      this.props.onCardClick(card);
    }
  };

  handleCardReplaceClicked = (cardId: string) => {
    if (this.props.onCardReplaceClick) {
      this.props.onCardReplaceClick(cardId);
    }
  };

  render = () => {
    return (
      <CardBoxWrapper className={`${this.props.className} ${this.props.condensed ? `condensed` : null}`}>
        {this.props.cards.map(card => (
          <CardBox key={card.id} className={this.props.condensed ? "condensed" : null}>
            <ScalableCard
              card={card}
              isHidden={this.props.cardsHidden}
              onCardClick={this.handleCardClicked}
              style={this.props.cardsClickable ? { cursor: "pointer" } : {}}
            />

            {this.props.cardsReplaceable && !this.props.touchSupported && (
              <ReplaceIcon
                fontSize="large"
                color="action"
                titleAccess="replace card"
                className="replace-icon"
                onClick={() => this.handleCardReplaceClicked(card.id)}
              />
            )}
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
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: -16px;
    margin-right: -16px;
    transition: padding-right 1s ease-in-out;

    &.condensed {
      padding-right: 285px;
      justify-content: center;
    }

    @media (min-width: 600px) {
      flex-wrap: wrap;
      justify-content: space-evenly;
      overflow-x: hidden;
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const CardBox: AnyStyledComponent = styled(Box)`
  && {
    position: relative;
    display: flex;
    padding: 20px;
    transition: margin-right 1s ease-in-out;

    &.condensed {
      margin-right: -285px;
    }

    & > .replace-icon {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover {
      & > .replace-icon {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;

const ScalableCard: AnyStyledComponent = styled(Card)`
  && {
    transition: transform 0.3s ease-in-out;

    &.touching {
      transform: scale(1.2);
      transition: transform 1s ease-in-out;
    }
  }
`;

const ReplaceIcon: AnyStyledComponent = styled(Replace)`
  && {
    position: absolute;
    bottom: 40px;
    left: 40px;
    cursor: pointer;
  }
`;

export default CardStack;
