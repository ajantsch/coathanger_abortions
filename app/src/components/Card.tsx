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

  handleCardClicked = () => {
    if (this.props.onCardClick && !this.state.clickDisabled) {
      if (!this.state.clickDisabled) {
        this.props.onCardClick(this.props.card);
      }
      this.setState({ clickDisabled: true });
      window.setTimeout(() => {
        this.setState({ clickDisabled: false });
      }, 1000);
    }
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
  height: 350px;
  margin: 25px;
  perspective: 600px;
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
  border-radius: 15px;
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
`;

const CardFront: AnyStyledComponent = styled(Paper)`
  && {
    background-size: 100px 58px;
    background-position: right 20px bottom 20px;
    background-repeat: no-repeat;

    transform: rotateY(0deg);

    ${SharedCardStyles}
  }
`;

const CardBack: AnyStyledComponent = styled(Paper)`
  && {
    background-size: 200px 116px;
    background-position: center center;
    background-repeat: no-repeat;

    transform: rotateY(180deg);

    ${SharedCardStyles}
  }
`;

const CardText: AnyStyledComponent = styled(Typography)`
  && {
    font-size: 1.2rem;
    line-height: 1.5;
    font-weight: 700;
  }
`;

const WinnerCup: AnyStyledComponent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -75px 0 0 -75px;
  display: block;
  width: 150px;
  height: 150px;
  background-image: url(${WinnerCupIcon});
  background-size: contain;
  background-repeat: no-repeat;
`;

export default Card;
