import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import { colors } from "../Theme";

import LetteringLight from "../images/lettering_light.svg";
import CoathangerLight from "../images/coathanger_light.svg";
import YSoSerious from "../images/y-so-serious-white.png";

class JoinLayout extends React.PureComponent {
  render = () => {
    return (
      <PageGrid container>
        <LeftGrid item xs={12} sm={6}>
          <GridContentContainer maxWidth="xs">
            <GridContentVerticalCenter>
              <Box>
                <Lettering src={LetteringLight} />
                <Typography variant="body1">
                  A game that reveals what terrible people your friends really are.
                </Typography>
              </Box>
            </GridContentVerticalCenter>
          </GridContentContainer>
        </LeftGrid>
        <RightGrid item xs={12} sm={6}>
          <GridContentContainer maxWidth="xs">
            <FormBox>
              <Box>{this.props.children}</Box>
            </FormBox>
          </GridContentContainer>
        </RightGrid>
      </PageGrid>
    );
  };
}

const PageGrid: AnyStyledComponent = styled(Grid)`
  height: 100%;
`;

const LeftGrid: AnyStyledComponent = styled(Grid)`
  background-color: ${colors.dark};
  color: ${colors.light};

  @media (min-height: 650px) {
    background-image: url(${CoathangerLight});
    background-position: bottom 32px right 32px;
    background-repeat: no-repeat;
    background-size: 35% auto;
  }

  @media (min-width: 600px) {
    background-size: 50% auto;
  }
`;

const RightGrid: AnyStyledComponent = styled(Grid)`
  background-image: url(${YSoSerious});
  background-repeat: repeat;
`;

const GridContentContainer: AnyStyledComponent = styled(Container)`
  && {
    height: 100%;
    padding-left: 32px;
    padding-right: 32px;
  }
`;

const GridContentVerticalCenter: AnyStyledComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  padding: 32px 0;

  @media (min-width: 600px) {
    justify-content: center;
  }
`;

const Lettering: AnyStyledComponent = styled.img`
  width: 100%;
  margin: 0 0 1rem 0;
`;

const FormBox: AnyStyledComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 32px 0;
`;

export default JoinLayout;
