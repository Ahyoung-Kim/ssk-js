import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useNavigation, useRoute } from "@react-navigation/native";

import { dateFormat } from "../../utils/date";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import TextInputForm from "../../components/inputs/TextInputForm";
import DropDownForm from "../../components/inputs/DropDownForm";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import BigButton from "../../components/common/BigButton";
import client from "../../config/axios";
import { Alert } from "react-native";

const CreateReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date, noteId, tutoringId, prevStates } = route.params;

  // console.log("prevStates: ", prevStates);
  const [reviewList, setReviewList] = useState([]);
  // 복습 내용
  const [body, setBody] = useState("");
  // 태그 아이디
  const [tagId, setTagId] = useState(null);

  const handleCreateClassNote = async () => {
    const body = {
      ...prevStates,
      reviewList,
      tutoringId,
    };

    // console.log(body);
    try {
      const ret = await client.post(`/api/note`, body);

      if (ret.status == 200) {
        Alert.alert("수업 일지가 등록되었습니다!");
        navigation.navigate("ClassNoteScreen", {
          date,
          noteId,
          tutoringId,
        });
      }
    } catch (err) {
      console.log("create class note error: ", err);
    }
  };

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        headerText={"복습 노트 작성"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader
          type="basic"
          text={date ? dateFormat(date) : "복습 노트 추가"}
        />

        <TextInputForm
          label="복습 내용"
          value={body}
          onChangeText={setBody}
          placeholder={"복습 내용을 입력하세요."}
        />

        <DropDownForm
          label="복습 태그"
          placeholder={"복습 태그를 선택하세요."}
          list={[{ tagId: 1, tagName: "확통" }]}
          textKey={"tagName"}
          onPressItem={(item) => {
            console.log(item);
            setTagId(item.tagId);
          }}
          menuHeight={150}
        />
      </MainLayout>

      {prevStates ? (
        <BigButton onPress={handleCreateClassNote} text="수업 일지 생성" />
      ) : (
        <BigButton onPress={() => {}} text="복습 노트 추가" />
      )}
    </KeyboardAvoidingLayout>
  );
};

export default CreateReviewScreen;
