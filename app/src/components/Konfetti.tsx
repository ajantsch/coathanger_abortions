import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import Confetti from "react-confetti";

interface IKonfettiProps {
  run: boolean;
}

class Konfetti extends React.Component<IKonfettiProps, {}> {
  render = () => {
    return (
      <StyledConfetti
        recycle={false}
        colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
        opacity={0.9}
        initialVelocityX={0}
        run={this.props.run}
      />
    );
  };
}

const StyledConfetti: AnyStyledComponent = styled(Confetti)`
  position: fixed !important;
`;

export default Konfetti;
