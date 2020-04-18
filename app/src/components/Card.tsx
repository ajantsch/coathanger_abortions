import React from "react";
import { Paper, Typography } from "@material-ui/core";
import styled, { css, AnyStyledComponent } from "styled-components";

import { ICard } from "../interfaces";

import CoathangerBlack from "../images/coathanger_black.png";
import CoathangerWhite from "../images/coathanger_white.png";

interface ICardProps {
  card: ICard;
  isHidden?: boolean;
  onCardClick?: (card: ICard) => void;
}

class Card extends React.PureComponent<ICardProps, {}> {
  handleCardClicked = () => {
    if (this.props.onCardClick) {
      this.props.onCardClick(this.props.card);
    }
  };

  render = () => {
    return (
      <CardRoot onClick={this.handleCardClicked}>
        <CardAnimation className={this.props.isHidden && "hidden"}>
          <CardBack className={`card ${this.props.card.type}`} />
          <CardFront className={`card ${this.props.card.type}`}>
            <Typography variant="h6">{this.props.card.content}</Typography>
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
  border-radius: 20px;
  padding: 20px;
  backface-visibility: hidden;

  &.question {
    background-color: #1c1c1c;
    background-image: url(${CoathangerWhite});
    color: #f3f3f4;
  }

  &.answer {
    background-color: #ffffff;
    background-image: url(${CoathangerBlack});
    border: 1px solid #e3e6eb;
    color: #1c1c1c;
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

export default Card;
