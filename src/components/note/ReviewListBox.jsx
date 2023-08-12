import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ClassInfoBoxContainer from "./ClassInfoBoxContainer";

import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EachReview = () => {
  return (
    <>
      <EachReviewContainer>
        <Dot />
        <ReviewName>복습 내용이 들어갈 부분</ReviewName>
      </EachReviewContainer>
    </>
  );
};

const ReviewListBox = ({ tutoringId }) => {
  const navigation = useNavigation();

  const onPressMoreButton = () => {
    navigation.navigate("ReviewListScreen", {
      tutoringId,
    });
  };

  return (
    <>
      <ClassInfoBoxContainer
        name="복습 노트"
        onPressMoreButton={onPressMoreButton}
      >
        <FlatList
          keyExtractor={(item, idx) => `reviewbox_${idx}`}
          data={[1, 2, 3]}
          renderItem={({ item }) => <EachReview data={item} />}
        />
      </ClassInfoBoxContainer>
    </>
  );
};

export default ReviewListBox;

const EachReviewContainer = styled.View`
  padding-vertical: 10;
  border-bottom-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
  flex-direction: row;
  align-items: center;
`;

const Dot = styled.View`
  width: 10;
  height: 10;
  border-radius: 100;
  background-color: ${color.COLOR_MAIN};
`;

const ReviewName = styled.Text`
  color: ${color.COLOR_GRAY_TEXT};
  font-size: 16;
  margin-left: 10;
`;
