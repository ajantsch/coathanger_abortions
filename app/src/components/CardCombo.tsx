import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import Card from "./Card";
import { IQuestionCard, IAnswerCard } from "../interfaces";

interface ICardComboProps {
  question: IQuestionCard;
  answer: IAnswerCard;
  className?: string;
}

class CardCombo extends React.PureComponent<ICardComboProps, {}> {
  render = () => {
    return (
      <CardComboRoot className={this.props.className}>
        <Card card={this.props.question} />
        <AnswerCardWrapper>
          <Card card={this.props.answer} />
        </AnswerCardWrapper>
      </CardComboRoot>
    );
  };
}

const CardComboRoot: AnyStyledComponent = styled(Box)`
  && {
    display: inline-block;
    vertical-align: middle;
  }
`;

const AnswerCardWrapper: AnyStyledComponent = styled(Box)`
  && {
    margin-top: -70px;
    margin-left: 20px;

    @media (min-width: 600px) {
      margin-top: -310px;
      margin-left: 220px;
    }
  }
`;

export default CardCombo;
