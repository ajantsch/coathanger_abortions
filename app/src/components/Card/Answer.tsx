import React from "react";
import { Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { BaseCardStyles } from "./Base";

interface IAnswerCardProps {
  content: string;
}

class AnswerCard extends React.PureComponent<IAnswerCardProps, {}> {
  render = () => {
    return (
      <AnswerCardRoot>
        <Typography variant="h6">{this.props.content}</Typography>
      </AnswerCardRoot>
    );
  };
}

const AnswerCardRoot: AnyStyledComponent = styled(BaseCardStyles)``;

export default AnswerCard;
