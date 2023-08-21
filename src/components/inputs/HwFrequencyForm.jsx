import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import InputContainer from "./InputContainer";

const HwFrequencyForm = ({ frequency, setFrequency }) => {
  const onPress = (day, selected) => {
    const _day = Number(day);

    if (selected) {
      setFrequency(frequency.filter((el) => el !== _day));
    } else {
      setFrequency([...frequency, _day]);
    }
  };

  return (
    <>
      <InputContainer label="제출 요일">
        <Container>
          {Object.keys(days).map((day) => {
            const selected = frequency.includes(Number(day));

            return (
              <DayButton
                key={`hwfrequency_${day}`}
                onPress={onPress.bind(this, day, selected)}
                bgColor={
                  selected ? color.COLOR_MAIN : color.COLOR_WHITE_BACKGROUND
                }
              >
                <DayText textColor={selected ? "white" : color.COLOR_MAIN}>
                  {days[day].text}
                </DayText>
              </DayButton>
            );
          })}
        </Container>
      </InputContainer>
    </>
  );
};

export default HwFrequencyForm;

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
  border-color: ${color.COLOR_MAIN};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const DayText = styled.Text`
  font-weight: bold;
  font-size: 16;
  color: ${({ textColor }) => textColor};
`;

const days = {
  1: {
    value: 1,
    text: "월",
  },
  2: {
    value: 2,
    text: "화",
  },
  3: {
    value: 3,
    text: "수",
  },
  4: {
    value: 4,
    text: "목",
  },
  5: {
    value: 5,
    text: "금",
  },
  6: {
    value: 6,
    text: "토",
  },
  7: {
    value: 7,
    text: "일",
  },
};
