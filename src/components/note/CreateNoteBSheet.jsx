import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import BottomSheet from "../common/BottomSheet";

import { dh } from "../../common/windowSize";
import { useNavigation } from "@react-navigation/native";
import { timeFormatToDate, tutoringTimeFormat } from "../../utils/date";

const CreateNoteBSheet = ({
  rbRef,
  date,
  noteId,
  tutoringId,
  progress,
  startTime,
}) => {
  const navigation = useNavigation();

  const goCreateProgressScreen = () => {
    const tutoringTime = tutoringTimeFormat(date, startTime);
    // console.log(tutoringTime);
    rbRef?.current?.close();
    navigation.navigate("CreateProgressScreen", {
      date,
      noteId,
      tutoringId,
      prevStates: {
        progress,
        tutoringTime,
      },
    });
  };

  const goCreateHwScreen = () => {
    rbRef?.current?.close();
    navigation.navigate("CreateHwScreen", {
      date,
      tutoringId,
    });
  };

  const goCreateReviewScreen = () => {
    rbRef?.current?.close();
    navigation.navigate("CreateReviewScreen", {
      date,
      tutoringId,
    });
  };

  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.3}>
        {!progress && (
          <TouchableArea onPress={goCreateProgressScreen}>
            <Text>수업 일지 생성</Text>
          </TouchableArea>
        )}

        <TouchableArea onPress={goCreateProgressScreen}>
          <Text>진도 보고 작성</Text>
        </TouchableArea>
        <TouchableArea onPress={goCreateHwScreen}>
          <Text>숙제 노트 작성</Text>
        </TouchableArea>
        <TouchableArea onPress={goCreateReviewScreen}>
          <Text>복습 노트 작성</Text>
        </TouchableArea>
      </BottomSheet>
    </>
  );
};

export default CreateNoteBSheet;

const TouchableArea = styled.TouchableOpacity`
  //   background-color: orange;
  width: 100%;
  height: ${dh * 0.05};
  padding-horizontal: 10;
  justify-content: center;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 18;
`;
