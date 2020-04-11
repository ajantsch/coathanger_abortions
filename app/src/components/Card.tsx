import React from "react";
import { Paper, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import Icon from "../images/icon.png";
import IconInverted from "../images/icon_inverted.png";

import CoathangerBlack from "../images/coathanger_black.png";
import CoathangerWhite from "../images/coathanger_white.png";

interface ICardProps {
  content: string;
  type: "answer" | "question";
}

class Card extends React.PureComponent<ICardProps, {}> {
  render = () => {
    return (
      <CardRoot className={`card ${this.props.type}`}>
        <Typography variant="h6">{this.props.content}</Typography>
      </CardRoot>
    );
  };
}

export const CardRoot: AnyStyledComponent = styled(Paper)`
  && {
    width: 250px;
    height: 350px;
    border-radius: 20px;
    padding: 20px;

    background-size: 100px 58px;
    background-position: right 20px bottom 20px;
    background-repeat: no-repeat;

    box-shadow: 0px 2px 24px #e3e6eb;

    &.question {
      background-color: #000000;
      background-image: url(${CoathangerWhite});
      color: #ffffff;
    }

    &.answer {
      background-color: #ffffff;
      background-image: url(${CoathangerBlack});
      border: 1px solid #e3e6eb;
      color: #000000;
    }
  }
`;

export default Card;
