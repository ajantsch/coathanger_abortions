import React from "react";
import { Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import IconInverted from "../../images/icon_inverted.png";

import { BaseCardStyles } from "./Base";

interface IBlackCardProps {
  content: string;
}

class BlackCard extends React.PureComponent<IBlackCardProps, {}> {
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
    background-image: url(${IconInverted});
    color: #ffffff;
  }
`;

export default BlackCard;
