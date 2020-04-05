import { Paper } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

export const BaseCardStyles: AnyStyledComponent = styled(Paper)`
  && {
    display: block;
    width: 250px;
    height: 350px;
    border-radius: 20px;
    padding: 20px;
  }
`;
