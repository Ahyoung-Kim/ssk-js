import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";

import { StyleSheet, Platform } from "react-native";
import TagModal from "../modal/TagModal";

const ReviewTagItem = ({ tag, setRefetch }) => {
  const { id, name } = tag;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TagContainer
        style={styles.tagContainer}
        activeOpacity={0.5}
        onPress={() => setModalVisible(true)}
      >
        <TagWrapper>
          <FontAwesome5 name="tag" size={14} color={color.COLOR_MAIN} />
          <TagNameWrapper>
            <TagName>{name}</TagName>
          </TagNameWrapper>
        </TagWrapper>

        <FontAwesome5
          name="angle-right"
          size={18}
          color={color.COLOR_GRAY_ICON}
        />
      </TagContainer>

      <TagModal
        tag={tag}
        setRefetch={setRefetch}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default ReviewTagItem;

const styles = StyleSheet.create({
  tagContainer: {
    ...Platform.select({
      ios: {
        shadowColor: color.COLOR_BOX_SHADOW,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

const TagContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding-vertical: 10;
  padding-horizontal: 15;
  border-radius: 5;
  margin-bottom: 5;
`;

const TagWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TagNameWrapper = styled.View`
  border-radius: 5;
  background-color: ${color.COLOR_REVIEW_TAG};
  padding-vertical: 5;
  padding-horizontal: 10;
  margin-left: 10;
`;

const TagName = styled.Text`
  font-size: 16;
  font-weight: bold;
`;
