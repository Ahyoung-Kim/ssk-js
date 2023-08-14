import React, { useEffect, useState } from "react";

import styled, { css } from "styled-components/native";
import color from "../../common/color";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import days from "../../constants/days";
import { proceedingPercentage } from "../../utils/assignment";

const HwItem = ({ data, editMode, onPressItem = () => {} }) => {
  // console.log("assignment : ", data);
  const {
    body,
    amount,
    count,
    endDate,
    frequency,
    goalCount,
    id,
    isCompleted,
    noteId,
    startDate,
  } = data;

  const navigation = useNavigation();

  const [proceeding, setProceeding] = useState(0);
  const [selected, setSelected] = useState(false);

  const onPress = () => {
    if (editMode) {
      setSelected(!selected);
      onPressItem(data);
    } else {
      navigation.navigate("HomeworkScreen", {
        assignment: data,
      });
    }
  };

  useEffect(() => {
    const proceeding = proceedingPercentage(count, goalCount);
    // console.log(proceeding);
    setProceeding(proceeding);
  }, [data]);

  return (
    <>
      <Container
        activeOpacity={0.7}
        onPress={onPress}
        style={
          editMode
            ? {
                borderColor: "white",
              }
            : {
                borderStyle: "solid",
                borderColor: color.COLOR_MAIN,
              }
        }
      >
        <Wrapper>
          <HwName>{body}</HwName>

          <DateWrapper>
            <DateDuration>
              {startDate} ~ {endDate}
            </DateDuration>
            <Frequency>
              매주
              {frequency.map((day) => ` ${days[day].text} `)}
              제출
            </Frequency>
          </DateWrapper>

          <StatusBar>
            <ProceedingBar proceeding={proceeding} />
          </StatusBar>
        </Wrapper>

        {editMode && (
          <EditContainer selected={selected}>
            <Ionicons
              name={selected ? "checkmark-circle" : "checkmark-circle-outline"}
              color={color.COLOR_RED_TEXT}
              size={20}
              style={{
                position: "absolute",
                top: 7,
                right: 10,
              }}
            />
          </EditContainer>
        )}
      </Container>
    </>
  );
};

export default HwItem;

const Container = styled.TouchableOpacity`
  border-radius: 8;
  margin-bottom: 10;
  position: relative;
  overflow: hidden;
  border-width: 1;
`;

const EditContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  border-radius: 8;
  border-width: 1.5;
  border-style: ${({ selected }) => (selected ? "solid" : "dashed")};
  border-color: ${color.COLOR_RED_TEXT};
  background-color: rgba(255, 255, 255, 0.6);
`;

const Wrapper = styled.View`
  width: 100%;
  padding-vertical: 15;
  padding-horizontal: 20;
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
