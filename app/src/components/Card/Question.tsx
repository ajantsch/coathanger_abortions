import React from "react";
import { Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { BaseCardStyles } from "./Base";

interface IQuestionCardProps {
  content: string;
}

class QuestionCard extends React.PureComponent<IQuestionCardProps, {}> {
  render = () => {
    return (
      <AnswerCardRoot>
        <Typography variant="h6">{this.props.content}</Typography>
      </AnswerCardRoot>
    );
  };
}

const AnswerCardRoot: AnyStyledComponent = styled(BaseCardStyles)`
  && {
    background-color: #000000;
    color: #ffffff;
  }
`;

export default QuestionCard;
