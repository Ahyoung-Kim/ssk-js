import React, { useState } from "react";

import styled, { css } from "styled-components/native";
import color from "../../common/color";

import { Platform, Pressable } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { dateToTimeFormat } from "../../utils/date";
import LeftBarContainer from "./LeftBarContainer";

const TimePicker = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  clickable = true,
}) => {
  const [pressStartTime, setPressStartTime] = useState(false);
  const [pressEndTime, setPressEndTime] = useState(false);

  const onChange = (e, _date) => {
    if (Platform.OS === "android") {
      if (pressStartTime) {
        setPressStartTime(false);
      } else if (pressEndTime) {
        setPressEndTime(false);
      }
    }

    if (e.type === "set") {
      if (pressStartTime) {
        setStartTime(_date);

        if (_date > endTime) {
          setEndTime(_date);
        }
      } else if (pressEndTime) {
        setEndTime(_date);

        if (_date < startTime) {
          setStartTime(_date);
        }
      }
    }
  };

  const handlePressTime = (isStartTime) => {
    if (clickable) {
      if (isStartTime) {
        if (pressEndTime) {
          setPressEndTime(false);
        }
        setPressStartTime(!pressStartTime);
      } else {
        if (pressStartTime) {
          setPressStartTime(false);
        }
        setPressEndTime(!pressEndTime);
      }
    }
  };

  return (
    <>
      <Container>
        <TimeWrapper>
          <LeftBarContainer
            label="Start Time"
            width="50%"
            onPress={handlePressTime.bind(this, true)}
          >
            <Time selected={clickable ? pressStartTime : true}>
              {dateToTimeFormat(startTime)}
            </Time>
          </LeftBarContainer>

          <LeftBarContainer
            label="End Time"
            width="50%"
            onPress={handlePressTime.bind(this, false)}
          >
            <Time selected={clickable ? pressEndTime : true}>
              {dateToTimeFormat(endTime)}
            </Time>
          </LeftBarContainer>
        </TimeWrapper>

        {(pressStartTime || pressEndTime) && (
          <DateTimePicker
            value={pressStartTime ? startTime : endTime}
            mode="time"
            display="spinner"
            onChange={onChange}
            style={{ width: "90%", alignSelf: "center" }} // IOS only
            themeVariant="light"
            minuteInterval={5}
            positiveButton={{ label: "선택", textColor: color.COLOR_MAIN }} // Android Only
            negativeButton={{ label: "취소", textColor: color.COLOR_GRAY_TEXT }} // Android Only
          />
        )}
      </Container>
    </>
  );
};

export default TimePicker;

const Container = styled.View`
  width: 100%;
`;

const TimeWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Time = styled.Text`
  font-size: 20;
  font-weight: bold;

  ${({ selected }) => {
    if (!selected) {
      return css`
        color: ${color.COLOR_GRAY_TEXT};
      `;
    }
  }}
`;
