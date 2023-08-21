import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";

const ReviewNameWithTag = ({ tagId, tagName, body }) => {
  return (
    <>
      <Container>
        <FontAwesome5 name="tag" color={color.COLOR_MAIN} size={14} />

        <ReviewTagView>
          <ReviewTagName>{tagName}</ReviewTagName>
        </ReviewTagView>

        <ReviewName>{body}</ReviewName>
      </Container>
    </>
  );
};

export default ReviewNameWithTag;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReviewTagView = styled.View`
  background-color: ${color.COLOR_REVIEW_TAG};
  padding-vertical: 4;
  padding-horizontal: 8;
  border-radius: 4;
  margin-horizontal: 10;
`;

const ReviewTagName = styled.Text``;

const ReviewName = styled.Text`
  font-size: 16;
`;
