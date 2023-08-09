import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { dateFormat } from "../../utils/date";
import { FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";

import InputContainer from "./InputContainer";
import DatePicker from "../common/DatePicker";
import LeftBarContainer from "../common/LeftBarContainer";

const DatePickerForm = ({ label, date, setDate, leftBar = false }) => {
  //   const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeDate = (e, _date) => {
    if (e.type === "set") {
      setDate(_date);
    }

    if (Platform.OS === "android") {
      setShowPicker(false);
    }
  };

  const Component = ({ children }) => {
    if (leftBar) {
      return <LeftBarContainer label={label}>{children}</LeftBarContainer>;
    } else {
      return <InputContainer label={label}>{children}</InputContainer>;
    }
  };

  return (
    <>
      <Component label={label}>
        <Container leftBar={leftBar} onPress={() => setShowPicker(!showPicker)}>
          <DateText>{dateFormat(date)}</DateText>

          <FontAwesome5
            name="calendar-alt"
            color={color.COLOR_MAIN}
            size={16}
          />
        </Container>
      </Component>

      {showPicker && (
        <DatePicker date={date} setDate={setDate} onChange={handleChangeDate} />
      )}
    </>
  );
};

export default DatePickerForm;

const Container = styled.Pressable`
  background-color: white;
  height: ${({ leftBar }) => (leftBar ? 40 : "100%")};
  width: 100%;
  border-radius: 5;
  border-color: ${color.COLOR_MAIN};
  border-width: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15;
`;

const DateText = styled.Text`
  font-size: 16;
`;
