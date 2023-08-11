import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import BottomSheet from "../common/BottomSheet";

import { dh } from "../../common/windowSize";
import { useNavigation } from "@react-navigation/native";

const CreateNoteBSheet = ({ rbRef, date, noteId, tutoringId }) => {
  const navigation = useNavigation();

  const onPress = (screenName) => {
    rbRef?.current?.close();
    navigation.navigate(screenName, {
      date,
      noteId,
      tutoringId,
    });
  };

  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.25}>
        <TouchableArea onPress={onPress.bind(this, "CreateProgressScreen")}>
          <Text>진도 보고 작성</Text>
        </TouchableArea>
        <TouchableArea onPress={onPress.bind(this, "CreateHwScreen")}>
          <Text>숙제 노트 추가</Text>
        </TouchableArea>
        <TouchableArea onPress={onPress.bind(this, "CreateReviewScreen")}>
          <Text>복습 노트 추가</Text>
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
