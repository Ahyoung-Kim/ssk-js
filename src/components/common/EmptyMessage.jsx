import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { AntDesign } from "@expo/vector-icons";

const EmptyMessage = ({ message, paddingVertical = 40 }) => {
  return (
    <>
      <Container paddingVertical={paddingVertical}>
        <AntDesign name={"message1"} size={16} color={color.COLOR_GRAY_ICON} />
        <Message>{message}</Message>
      </Container>
    </>
  );
};

export default EmptyMessage;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  //   background-color: orange;
  padding-vertical: ${({ paddingVertical }) => paddingVertical};
`;

const Message = styled.Text`
  //   font-weight: bold;
  font-size: 16;
  color: ${color.COLOR_GRAY_TEXT};
  margin-left: 5;
`;
