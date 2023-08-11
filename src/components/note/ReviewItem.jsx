import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Ionicons } from "@expo/vector-icons";

const ReviewItem = ({ data, editMode, onPressItem = () => {}, completed }) => {
  const [click, setClick] = useState(false);
  const [selected, setSelected] = useState(false);

  const onPressClickBox = () => {
    if (editMode) {
      setSelected(!selected);
      onPressItem(data);
    } else {
      if (!completed) {
        setClick(!click);
      }
    }
  };

  return (
    <>
      <Container>
        <Wraaper>
          <Dot />
          <ReviewName>지수와 로그 - 로그함수 응용</ReviewName>

          {editMode && <EditWrapper />}
        </Wraaper>

        <CheckBox onPress={onPressClickBox}>
          {editMode ? (
            <Ionicons
              name={selected ? "checkmark-circle" : "checkmark-circle-outline"}
              color={color.COLOR_RED_TEXT}
              size={20}
            />
          ) : (
            <Ionicons
              name={click ? "checkbox" : "checkbox-outline"}
              color={color.COLOR_MAIN}
              size={20}
              style={completed ? { opacity: 0 } : {}}
            />
          )}
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

const EditWrapper = styled.View`
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
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