import React from "react";
import { Box } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";
import { IQuestionCard, IAnswerCard } from "../interfaces";

interface ICardComboProps {
  question: IQuestionCard;
  answer?: IAnswerCard;
  showAnswerPlaceholder?: boolean;
  answerPlaceholderText?: string;
  className?: string;
}

class CardCombo extends React.PureComponent<ICardComboProps, {}> {
  render = () => {
    return (
      <CardComboRoot className={this.props.className}>
        <Card card={this.props.question} />
        {this.props.answer && <StyledCard card={this.props.answer} />}
        {!!!this.props.answer && this.props.showAnswerPlaceholder && <StyledCardPlaceholder type="answer" />}
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

const StyledCardPlaceholder: AnyStyledComponent = styled(CardPlaceholder)`
  && {
    margin-top: -70px;
    margin-left: 20px;

    @media (min-width: 600px) {
      margin-top: -310px;
      margin-left: 220px;
    }
  }
`;

const StyledCard: AnyStyledComponent = styled(Card)`
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
