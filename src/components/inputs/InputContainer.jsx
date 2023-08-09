import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import InputLabel from "./InputLabel";

const InputContainer = ({
  children,
  label,
  paddingHorizontal = 15,
  height = 40,
}) => {
  return (
    <>
      <Container paddingHorizontal={paddingHorizontal}>
        {label && <InputLabel label={label} />}

        <Contents height={height}>{children}</Contents>
      </Container>
    </>
  );
};

export default InputContainer;

const Container = styled.View`
  // background-color: aqua;
  width: 100%;
  padding-horizontal: ${({ paddingHorizontal }) => paddingHorizontal};
  margin-vertical: 7;
  z-index: 1;
`;

const Contents = styled.View`
  ${({ height }) => height && `height: ${height};`}
  width: 100%;
`;
