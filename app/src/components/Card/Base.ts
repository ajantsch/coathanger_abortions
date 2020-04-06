import { Paper } from "@material-ui/core";
import styled, { AnyStyledComponent } from "styled-components";

import Icon from "../../images/icon.png";

export const BaseCardStyles: AnyStyledComponent = styled(Paper)`
  && {
    display: block;
    width: 250px;
    height: 350px;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;

    background-image: url(${Icon});
    background-size: 25px 25px;
    background-position: left 20px bottom 20px;
    background-repeat: no-repeat;

    box-shadow: 0px 2px 24px #e3e6eb;
  }
`;
