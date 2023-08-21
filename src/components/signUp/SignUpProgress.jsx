import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const SignUpProgress = ({ page }) => {
  return (
    <>
      <Container>
        <Circle filled={page >= 1} />

        <HorizontalLine filled={page >= 2} />
        <Circle filled={page >= 2} />

        <HorizontalLine filled={page >= 3} />
        <Circle filled={page >= 3} />
      </Container>
    </>
  );
};

export default SignUpProgress;

const Container = styled.View`
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  padding-vertical: 15;
  padding-horizontal: 15;
`;

const Circle = styled.View`
  background-color: ${({ filled }) =>
    filled ? color.COLOR_MAIN : color.COLOR_DEEPGRAY_BACKGROUND};
  width: 25;
  height: 25;
  border-radius: 100px;
`;

const HorizontalLine = styled.View`
  width: 20;
  height: 3;
  background-color: ${({ filled }) =>
    filled ? color.COLOR_MAIN : color.COLOR_DEEPGRAY_BACKGROUND};
`;
