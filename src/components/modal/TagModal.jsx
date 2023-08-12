import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ModalContainer from "./ModalContainer";
import ConfirmButtons from "../common/ConfirmButtons";
import TextInputForm from "../inputs/TextInputForm";
import { FontAwesome5 } from "@expo/vector-icons";
import client from "../../config/axios";
import { Alert } from "react-native";

const TagModal = ({ tag, modalVisible, setModalVisible, setRefetch }) => {
  const [tagName, setTagName] = useState(tag.name);

  const handleResponse = () => {
    setModalVisible(false);
    setRefetch(true);
  };

  const handleUpdateTagName = async () => {
    try {
      const ret = await client.put(`/api/tag/${tag.id}`, {
        tagName,
      });

      if (ret.status == 200) {
        handleResponse();
      }
    } catch (err) {
      console.log("update tag name error: ", err);
    }
  };

  const onDelete = async () => {
    try {
      const ret = await client.delete(`/api/tag/${tag.id}`);

      if (ret.status == 200) {
        handleResponse();
      }
    } catch (err) {
      console.log("delete tag error: ", err);
    }
  };

  const handleDeleteTag = () => {
    Alert.alert("태그 삭제", "해당 복습 태그를 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <>
      <ModalContainer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <DeleteButtonWrapper>
          <DeleteButton onPress={handleDeleteTag}>
            <FontAwesome5
              name="trash-alt"
              size={14}
              color={color.COLOR_GRAY_ICON}
            />
            <DeleteText>삭제</DeleteText>
          </DeleteButton>
        </DeleteButtonWrapper>
        <TextInputForm
          label="태그 이름 편집"
          placeholder={"복습 태그 이름을 입력하세요."}
          value={tagName}
          onChangeText={setTagName}
          button={"완료"}
          handleButtonPress={handleUpdateTagName}
        />
      </ModalContainer>
    </>
  );
};

export default TagModal;

const DeleteButtonWrapper = styled.View`
  align-items: flex-end;
  margin-bottom: 10;
`;

const DeleteButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DeleteText = styled.Text`
  font-size: 16;
  color: ${color.COLOR_GRAY_TEXT};
  margin-left: 5;
`;
