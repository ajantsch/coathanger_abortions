import React from "react";
import { Box, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";

interface ISeperatorProps {
  text?: string;
}

class Separator extends React.PureComponent<ISeperatorProps, {}> {
  render = () => {
    return (
      <SeparatorRoot>
        <SeparatorLine />
        {this.props.text && <SeparatorText variant="overline">{this.props.text}</SeparatorText>}
        <SeparatorLine />
      </SeparatorRoot>
    );
  };
}

const SeparatorRoot: AnyStyledComponent = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  max-width: 800px;
  margin: 0 auto;
`;

const SeparatorLine: AnyStyledComponent = styled(Box)`
  flex-basis: 50%;
  flex-shrink: 1;
  height: 0;
  border-top: 1px solid ${colors.dark};
`;

const SeparatorText: AnyStyledComponent = styled(Typography)`
  && {
    flex-shrink: 0;
    margin: 0 1rem;
  }
`;

export default Separator;
