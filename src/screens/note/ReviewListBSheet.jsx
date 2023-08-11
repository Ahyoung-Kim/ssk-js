import React from "react";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../components/common/BottomSheet";
import { dh } from "../../common/windowSize";

const ReviewListBSheet = ({ rbRef, tutoringId, noteId }) => {
  const navigation = useNavigation();

  const goCreateReviewScreen = () => {
    rbRef?.current?.close();
    navigation.navigate("CreateReviewScreen", {
      tutoringId,
      noteId,
    });
  };

  const goCreateTagScreen = () => {
    rbRef?.current?.close();
  };

  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.25}>
        <TouchableArea onPress={goCreateReviewScreen}>
          <Text>복습 노트 추가</Text>
        </TouchableArea>

        <TouchableArea onPress={goCreateTagScreen}>
          <Text>복습 태그 관리</Text>
        </TouchableArea>
      </BottomSheet>
    </>
  );
};

export default ReviewListBSheet;

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
