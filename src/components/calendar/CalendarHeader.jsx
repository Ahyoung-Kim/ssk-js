import React, { useRef, useState } from "react";
import styled from "styled-components/native";

import { FontAwesome5 } from "@expo/vector-icons";

import color from "../../common/color";

const size = 24;

const CalendarHeader = ({
  selectedMonth,
  selectedYear,
  handleMoveMonth,
  handleToggleShowPicker,
}) => {
  return (
    <Container>
      <Button onPress={handleMoveMonth.bind(this, -1)}>
        <FontAwesome5
          name="chevron-left"
          size={size}
          color={color.COLOR_MAIN}
        />
      </Button>
      <HeaderText onPress={handleToggleShowPicker}>
        {selectedYear}년 {selectedMonth.toString().padStart(2, "0")}월
      </HeaderText>
      <Button onPress={handleMoveMonth.bind(this, 1)}>
        <FontAwesome5
          name="chevron-right"
          size={size}
          color={color.COLOR_MAIN}
        />
      </Button>
    </Container>
  );
};

export default CalendarHeader;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  //   justify-content: center;
  justify-content: space-between;
  padding-vertical: 20;
`;

const HeaderText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-size: ${size};
  font-weight: bold;
`;

const Button = styled.Pressable`
  padding-horizontal: 20;
`;
