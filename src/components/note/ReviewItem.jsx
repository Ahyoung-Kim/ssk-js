import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Ionicons } from "@expo/vector-icons";

const ReviewItem = () => {
  const [click, setClick] = useState(false);

  const onPressClickBox = () => {
    setClick(!click);
  };

  return (
    <>
      <Container>
        <Wraaper>
          <Dot />
          <ReviewName>지수와 로그 - 로그함수 응용</ReviewName>
        </Wraaper>

        <CheckBox onPress={onPressClickBox}>
          <Ionicons
            name={click ? "checkbox" : "checkbox-outline"}
            color={color.COLOR_MAIN}
            size={20}
          />
        </CheckBox>
      </Container>
    </>
  );
};

export default ReviewItem;

const Container = styled.View`
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 7;
  padding-horizontal: 5;
  border-bottom-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
`;

const Wraaper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dot = styled.View`
  width: 10;
  height: 10;
  border-radius: 100;
  background-color: ${color.COLOR_MAIN};
`;

const ReviewName = styled.Text`
  font-size: 16;
  margin-left: 10;
`;

const CheckBox = styled.Pressable``;
