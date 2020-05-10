import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import Confetti from "react-confetti";

interface IKonfettiProps {
  run: boolean;
}

class Konfetti extends React.Component<IKonfettiProps, {}> {
  render = () => {
    return this.props.run ? (
      <StyledConfetti
        recycle={false}
        colors={["#1c1c1c", "#fcf6ba", "#b38728"]}
        opacity={0.9}
        initialVelocityX={0}
        run={true}
      />
    ) : (
      <></>
    );
  };
}

const StyledConfetti: AnyStyledComponent = styled(Confetti)`
  position: fixed !important;
`;

export default Konfetti;
