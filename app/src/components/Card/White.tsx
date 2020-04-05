import React from "react";
import { Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { BaseCardStyles } from "./Base";

interface IWhiteCardProps {
  content: string;
}

class WhiteCard extends React.PureComponent<IWhiteCardProps, {}> {
  render = () => {
    return (
      <AnswerCardRoot>
        <Typography variant="h6">{this.props.content}</Typography>
      </AnswerCardRoot>
    );
  };
}

const AnswerCardRoot: AnyStyledComponent = styled(BaseCardStyles)``;

export default WhiteCard;
