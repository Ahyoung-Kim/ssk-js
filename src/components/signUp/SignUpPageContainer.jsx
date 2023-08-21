import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const SignUpPageContainer = ({ text, children }) => {
  return (
    <Container>
      <Text>{text}</Text>
      <Content>{children}</Content>
    </Container>
  );
};

export default SignUpPageContainer;

const Container = styled.View`
  //   background-color: orange;
  padding-horizontal: 15;
`;

const Text = styled.Text`
  font-size: 24;
  font-weight: bold;
  color: ${color.COLOR_GRAY_TEXT};
  margin-bottom: 20;
`;

const Content = styled.View``;
