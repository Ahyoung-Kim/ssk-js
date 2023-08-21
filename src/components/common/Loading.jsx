import React from "react";

import styled from "styled-components/native";

const Loading = ({ size = 70, padding = 50 }) => {
  return (
    <Container padding={padding}>
      <LoadingImage
        size={size}
        source={require("../../assets/loading/loading-spinner.gif")}
      />
    </Container>
  );
};

export default Loading;

const Container = styled.View`
  //   background-color: orange;
  width: 100%;
  padding-vertical: ${({ padding }) => padding};
  justify-content: center;
  align-items: center;
`;

const LoadingImage = styled.Image`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  resize-mode: contain;
`;
