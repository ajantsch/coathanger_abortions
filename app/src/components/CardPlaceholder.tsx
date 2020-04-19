import React from "react";
import { Typography } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import styled, { AnyStyledComponent } from "styled-components";

interface ICardPlaceholderProps {
  type: "answer" | "question";
  content?: string;
  onPlaceholderClick?: () => void;
}

class CardPlaceholder extends React.PureComponent<ICardPlaceholderProps, {}> {
  handleClick = () => {
    if (this.props.onPlaceholderClick) {
      this.props.onPlaceholderClick();
    }
  };

  render = () => {
    return (
      <CardRoot className={this.props.type} onClick={this.handleClick}>
        <CardContent>
          {this.props.content && <Typography variant="h6">{this.props.content}</Typography>}
          <ControlPoint fontSize="large" />
        </CardContent>
      </CardRoot>
    );
  };
}

const CardRoot: AnyStyledComponent = styled.div`
  width: 250px;
  height: 350px;
  margin: 25px;
  padding-top: 100px;

  border-radius: 15px;
  border-style: dashed;
  border-width: 5px;

  &.question {
    background: #f3f3f4;
    border-color: #1c1c1c;
  }
`;

const CardContent: AnyStyledComponent = styled.div`
  padding: 25px;
  cursor: pointer;
  text-align: center;
`;

export default CardPlaceholder;
