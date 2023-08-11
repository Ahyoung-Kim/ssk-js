import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import InputContainer from "./InputContainer";
import TimePicker from "../common/TimePicker";

import { dateToTimeFormat } from "../../utils/date";

import { FontAwesome5, Feather } from "@expo/vector-icons";

const RegularScheduleForm = ({ days, setDays }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const today = new Date();
  today.setMinutes(0);
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(today);

  const handleDayPress = (objKey) => {
    setSelectedDay(objKey);
  };

  const handlePressXMark = (objKey) => {
    const dayInfo = { ...days[objKey] };

    if (selectedDay === objKey) {
      setSelectedDay(null);

      for (key in days) {
        if (days[key].selected && key !== objKey) {
          setSelectedDay(key);
          break;
        }
      }
    }

    setDays({
      ...days,
      [objKey]: {
        ...dayInfo,
        selected: false,
      },
    });
  };

  const setDayTime = (objKey, startTime, endTime) => {
    const dayInfo = { ...days[objKey] };
    setDays({
      ...days,
      [objKey]: {
        ...dayInfo,
        startTime,
        endTime,
        selected: true,
      },
    });
  };

  useEffect(() => {
    if (selectedDay) {
      setDayTime(selectedDay, startTime, endTime);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (selectedDay) {
      const _startTime = days[selectedDay].startTime;
      const _endTime = days[selectedDay].endTime;

      if (_startTime && _endTime) {
        setStartTime(_startTime);
        setEndTime(_endTime);
      } else {
        setDayTime(selectedDay, startTime, endTime);
      }
    }
  }, [selectedDay]);

  return (
    <>
      <InputContainer label={"정규 일정"}>
        <Container>
          {Object.keys(days).map((day) => (
            <DayButton
              key={days[day].id}
              borderColor={
                days[day].selected ? color.COLOR_MAIN : color.COLOR_GRAY_BORDER
              }
              bgColor={
                selectedDay === day
                  ? color.COLOR_MAIN
                  : color.COLOR_WHITE_BACKGROUND
              }
              onPress={handleDayPress.bind(this, day)}
            >
              <DayText
                textColor={
                  !days[day].selected
                    ? color.COLOR_GRAY_TEXT
                    : selectedDay === day
                    ? "#fff"
                    : color.COLOR_MAIN
                }
              >
                {days[day].text}
              </DayText>
            </DayButton>
          ))}
        </Container>
      </InputContainer>

      <SelectedList>
        {Object.keys(days).map((day) => {
          if (days[day].selected) {
            return (
              <SelectedView>
                <SelectedTextView>
                  <FontAwesome5
                    name="check"
                    size={10}
                    style={{ marginRight: 5 }}
                    color={color.COLOR_GRAY_TEXT}
                  />
                  <SelectedText
                    highlight={selectedDay === day}
                    onPress={handleDayPress.bind(this, day)}
                  >
                    {days[day].text} -{" "}
                    {days[day].startTime
                      ? dateToTimeFormat(days[day].startTime)
                      : dateToTimeFormat(startTime)}{" "}
                    ~{" "}
                    {days[day].endTime
                      ? dateToTimeFormat(days[day].endTime)
                      : dateToTimeFormat(endTime)}
                  </SelectedText>
                </SelectedTextView>

                <Feather
                  onPress={handlePressXMark.bind(this, day)}
                  name="x"
                  size={14}
                  color={color.COLOR_GRAY_TEXT}
                />
              </SelectedView>
            );
          }
        })}
      </SelectedList>

      {selectedDay && (
        <TimePickerContainer>
          <TimePicker
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </TimePickerContainer>
      )}
    </>
  );
};

export default RegularScheduleForm;

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DayButton = styled.Pressable`
  height: 100%;
  width: 13%;
  background-color: ${({ bgColor }) => bgColor};
  border-width: 1;
  border-color: ${({ borderColor }) => borderColor};
  border-radius: 5;
  align-items: center;
  justify-content: center;
`;

const DayText = styled.Text`
  font-weight: bold;
  font-size: 16;
  color: ${({ textColor }) => textColor};
`;

const SelectedList = styled.View`
  //   background-color: orange;
  padding-horizontal: 20;
`;

const SelectedView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 5;
`;

const SelectedTextView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SelectedText = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: ${color.COLOR_GRAY_TEXT};
`;

const TimePickerContainer = styled.View`
  margin-vertical: 5;
  padding-horizontal: 15;
  width: 100%;
`;
