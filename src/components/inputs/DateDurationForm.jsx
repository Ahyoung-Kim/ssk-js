import React, { useEffect, useState } from "react";

import styled, { css } from "styled-components/native";
import color from "../../common/color";

import { dateFormat } from "../../utils/date";
import { FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";

import InputContainer from "./InputContainer";
import DatePicker from "../common/DatePicker";

const DateDurationForm = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [date, setDate] = useState(startDate);
  const [showPicker, setShowPicker] = useState(false);

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const handleChangeDate = (e, _date) => {
    if (e.type === "set") {
      if (openStartDate) {
        setStartDate(_date);

        if (_date > endDate) {
          setEndDate(_date);
        }
      } else if (openEndDate) {
        setEndDate(_date);

        if (_date < startDate) {
          setStartDate(_date);
        }
      }
    }

    if (Platform.OS === "android") {
      setShowPicker(false);
    }
  };

  const onPress = (isStartDate) => {
    let _showPicker = true;

    if (isStartDate) {
      _showPicker = !openStartDate;
      setOpenStartDate(_showPicker);
      setDate(startDate);
      if (openEndDate) {
        setOpenEndDate(false);
      }
    } else {
      _showPicker = !openEndDate;
      setOpenEndDate(_showPicker);
      setDate(endDate);
      if (openStartDate) {
        setOpenStartDate(false);
      }
    }

    setShowPicker(_showPicker);
  };

  return (
    <>
      <Wrapper>
        <InputContainer label={"숙제 시작일"} width="50%" paddingHorizontal={5}>
          <Container onPress={onPress.bind(this, true)}>
            <DateText selected={openStartDate}>
              {dateFormat(startDate)}
            </DateText>
            <FontAwesome5
              name="calendar-alt"
              color={color.COLOR_MAIN}
              size={14}
            />
          </Container>
        </InputContainer>

        <InputContainer label={"숙제 종료일"} width="50%" paddingHorizontal={5}>
          <Container onPress={onPress.bind(this, false)}>
            <DateText selected={openEndDate}>{dateFormat(endDate)}</DateText>
            <FontAwesome5
              name="calendar-alt"
              color={color.COLOR_MAIN}
              size={14}
            />
          </Container>
        </InputContainer>
      </Wrapper>

      {showPicker && (
        <DatePicker date={date} setDate={setDate} onChange={handleChangeDate} />
      )}
    </>
  );
};

export default DateDurationForm;

const Wrapper = styled.View`
  width: 100%;
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10;
`;

const Container = styled.Pressable`
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border-color: ${color.COLOR_MAIN};
  border-width: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15;
`;

const DateText = styled.Text`
  font-size: 16;
  color: ${color.COLOR_GRAY_TEXT};
  ${({ selected }) => {
    if (selected) {
      return css`
        color: black;
        font-weight: bold;
      `;
    }
  }}
`;
