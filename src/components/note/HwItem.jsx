import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const HwItem = ({ proceeding = "70%" }) => {
  return (
    <>
      <Container onPress={() => {}}>
        <HwName>블랙라벨 15문제</HwName>

        <DateWrapper>
          <DateDuration>2023년 8월 1일 ~ 2023년 8월 2일</DateDuration>
          <Frequency>매주 월요일 제출</Frequency>
        </DateWrapper>

        <StatusBar>
          <ProceedingBar proceeding={proceeding} />
        </StatusBar>
      </Container>
    </>
  );
};

export default HwItem;

const Container = styled.TouchableOpacity`
  border-width: 1;
  border-color: ${color.COLOR_MAIN};
  width: 100%;
  padding-vertical: 15;
  padding-horizontal: 20;
  border-radius: 8;
  margin-bottom: 5;
`;

const HwName = styled.Text`
  font-weight: bold;
  font-size: 16;
`;

const DateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5;
  margin-bottom: 15;
`;

const DateDuration = styled.Text`
  color: ${color.COLOR_GRAY_TEXT};
  font-size: 12;
  font-weight: bold;
`;

const Frequency = styled.Text`
  color: ${color.COLOR_GRAY_TEXT};
  font-size: 12;
`;

const StatusBar = styled.View`
  width: 100%;
  height: 30;
  border-radius: 50%;
  background-color: #dadada;
  overflow: hidden;
`;

const ProceedingBar = styled.View`
  height: 100%;
  width: ${({ proceeding }) => proceeding};
  background-color: ${color.COLOR_MAIN};
`;
