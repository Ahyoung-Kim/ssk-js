import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const EmptyClassList = ({ schedule = false }) => {
  return (
    <Container>
      <Text>{schedule ? "일정" : "수업"} 목록이 없습니다.</Text>
    </Container>
  );
};

export default EmptyClassList;

const Container = styled.View`
  //   background-color: orange;
  align-items: center;
  justify-content: center;
  padding-vertical: 50;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 16;
  color: ${color.COLOR_GRAY_TEXT};
`;
