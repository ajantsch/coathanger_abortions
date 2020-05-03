import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import Card from "./Card";
import { IQuestionCard, IAnswerCard } from "../interfaces";

interface ICardComboProps {
  question: IQuestionCard;
  answer: IAnswerCard;
}

class CardCombo extends React.PureComponent<ICardComboProps, {}> {
  render = () => {
    return (
      <CardComboRoot>
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
    margin-top: -200px;
    margin-left: 50px;
  }
`;

export default CardCombo;
