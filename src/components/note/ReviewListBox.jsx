import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ClassInfoBoxContainer from "./ClassInfoBoxContainer";

import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EmptyMessage from "../common/EmptyMessage";
import ReviewNameWithTag from "./ReviewNameWithTag";

const EachReview = ({ review }) => {
  const { body, id, isCompleted, tagId, tagName } = review;

  return (
    <>
      <EachReviewContainer>
        <ReviewNameWithTag tagId={tagId} tagName={tagName} body={body} />
      </EachReviewContainer>
    </>
  );
};

const ReviewListBox = ({ tutoringId, reviewList }) => {
  const navigation = useNavigation();

  const onPressMoreButton = () => {
    navigation.navigate("ReviewListScreen", {
      tutoringId,
    });
  };

  if (!reviewList) {
    return;
  }

  return (
    <>
      <ClassInfoBoxContainer
        name="복습 노트"
        onPressMoreButton={onPressMoreButton}
      >
        {reviewList.length == 0 ? (
          <EmptyMessage paddingVertical={20} message="복습 목록이 없습니다!" />
        ) : (
          <FlatList
            keyExtractor={(item, idx) => `reviewbox_${item.id}`}
            data={reviewList}
            renderItem={({ item }) => <EachReview review={item} />}
          />
        )}
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
