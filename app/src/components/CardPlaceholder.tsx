import React from "react";
import { Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

interface ICardPlaceholderProps {
  type: "answer" | "question";
  content?: string;
  onPlaceholderClick?: () => void;
  className?: string;
}

class CardPlaceholder extends React.PureComponent<ICardPlaceholderProps, {}> {
  handleClick = () => {
    if (this.props.onPlaceholderClick) {
      this.props.onPlaceholderClick();
    }
  };

  render = () => {
    return (
      <CardRoot className={`${this.props.className} ${this.props.type}`} onClick={this.handleClick}>
        <CardContent>{this.props.content && <Typography variant="h6">{this.props.content}</Typography>}</CardContent>
      </CardRoot>
    );
  };
}

const CardRoot: AnyStyledComponent = styled.div`
  width: 250px;
  height: 250px;
  padding-top: 100px;

  border-radius: 15px;
  border-style: dashed;
  border-width: 5px;
  border-color: #1c1c1c;

  @media (min-width: 600px) {
    height: 350px;
    padding-top: 130px;
  }
`;

const CardContent: AnyStyledComponent = styled.div`
  padding: 0 30px;
  text-align: center;
`;

export default CardPlaceholder;
