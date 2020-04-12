import React from "react";
import { Box } from "@material-ui/core";

import { ICard } from "../services/api/game";

import Card from "./Card";
import CardStack from "./CardStack";

interface IRoundProps {
  question: ICard | undefined;
  answers: { player: string; card: ICard }[];
}

class Round extends React.Component<IRoundProps, {}> {
  render = () => {
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box flexGrow={0} flexShrink={0} flexBasis={250}>
          {this.props.question ? (
            <Card id={this.props.question.id} type="question" content={this.props.question.content} />
          ) : (
            <></>
          )}
        </Box>
        <Box flexGrow={1} flexShrink={0} flexBasis={250}>
          <CardStack cards={this.props.answers.map(answer => answer.card)} />
        </Box>
      </Box>
    );
  };
}

export default Round;
