import React from "react";
import { Paper, Typography } from "@material-ui/core";
import styled, { css, AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";
import { colors } from "../Theme";

import CoathangerDark from "../images/coathanger_dark.svg";
import CoathangerLight from "../images/coathanger_light.svg";
import WinnerCupIcon from "../images/winner_cup.svg";

interface ICardProps {
  card: ICard;
  isHidden?: boolean;
  onCardClick?: (card: ICard) => void;
  isWinningCard?: boolean;
}

interface ICardState {
  clickDisabled: boolean;
}

const DEFAULT_STATE: ICardState = {
  clickDisabled: false,
};

class Card extends React.PureComponent<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  debounceTimerId: undefined | number = undefined;

  handleCardClicked = () => {
    if (this.props.onCardClick && !this.state.clickDisabled) {
      if (!this.state.clickDisabled) {
        this.props.onCardClick(this.props.card);
      }
      this.setState({ clickDisabled: true });
      this.debounceTimerId = window.setTimeout(() => {
        this.setState({ clickDisabled: false });
      }, 1000);
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.debounceTimerId);
  };

  render = () => {
    return (
      <CardRoot onClick={this.handleCardClicked}>
        <CardAnimation className={this.props.isHidden && "hidden"}>
          <CardBack className={`card ${this.props.card.type}`} />
          <CardFront className={`card ${this.props.card.type}`}>
            <CardText>{this.props.card.content}</CardText>
            {this.props.isWinningCard && <WinnerCup />}
          </CardFront>
        </CardAnimation>
      </CardRoot>
    );
  };
}

const CardRoot: AnyStyledComponent = styled.div`
  width: 250px;
  height: 250px;
  perspective: 400px;

  @media (min-width: 600px) {
    height: 350px;
    perspective: 600px;
  }
`;

const CardAnimation: AnyStyledComponent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  transition: transform 1s;
  transform-style: preserve-3d;

  &.hidden {
    transform: rotateY(180deg);
  }
`;

const SharedCardStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 20px;
  backface-visibility: hidden;
  white-space: normal;
  text-align: left;
  user-select: none;

  &.question {
    background-color: ${colors.dark};
    background-image: url(${CoathangerLight});
    color: ${colors.light};
  }

  &.answer {
    background-color: #ffffff;
    background-image: url(${CoathangerDark});
    border: 1px solid #e3e6eb;
    color: ${colors.dark};
  }

  @media (min-width: 600px) {
    border-radius: 15px;
  }
`;

const CardFront: AnyStyledComponent = styled(Paper)`
  && {
    background-size: 70px auto;
    background-position: right 20px bottom 20px;
    background-repeat: no-repeat;

    transform: rotateY(0deg);

    ${SharedCardStyles}

    @media (min-width: 600px) {
      background-size: 100px auto;
    }
  }
`;

const CardBack: AnyStyledComponent = styled(Paper)`
  && {
    background-size: 150px auto;
    background-position: center center;
    background-repeat: no-repeat;

    transform: rotateY(180deg);

    ${SharedCardStyles}

    @media (min-width: 600px) {
      background-size: 200px auto;
    }
  }
`;

const CardText: AnyStyledComponent = styled(Typography)`
  && {
    font-size: 1.1rem;
    line-height: 1.5;
    font-weight: 700;

    @media (min-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

const WinnerCup: AnyStyledComponent = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  margin: 0 0 0 -70px;
  display: block;
  width: 100px;
  height: 100px;
  background-image: url(${WinnerCupIcon});
  background-size: contain;
  background-repeat: no-repeat;

  @media (min-width: 600px) {
    width: 150px;
    height: 150px;
    bottom: 3rem;
    margin: 0 0 0 -95px;
  }
`;

export default Card;
