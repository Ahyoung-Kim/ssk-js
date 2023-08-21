import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const ErrorMessage = ({}) => {
  return (
    <Container>
      <ErrText>Error: Something wrong</ErrText>
    </Container>
  );
};

export default ErrorMessage;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-vertical: 50;
  align-items: center;
  justify-content: center;
`;

const ErrText = styled.Text`
  font-weight: bold;
  font-size: 20;
`;
