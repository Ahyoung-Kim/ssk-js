import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useRoute } from "@react-navigation/native";

import { dateFormat } from "../../utils/date";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import TextInputForm from "../../components/inputs/TextInputForm";
import DropDownForm from "../../components/inputs/DropDownForm";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import BigButton from "../../components/common/BigButton";

const CreateReviewScreen = () => {
  const route = useRoute();
  const { date, noteId, tutoringId } = route.params;

  // 복습 내용
  const [body, setBody] = useState("");
  // 태그 아이디
  const [tagId, setTagId] = useState(null);

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        headerText={"복습 노트 추가"}
        headerType={"back"}
        bgColor="white"
      >
        <NoteHeader type="basic" text={dateFormat(date)} />

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

      <BigButton onPress={() => {}} text="복습 노트 추가" />
    </KeyboardAvoidingLayout>
  );
};

export default CreateReviewScreen;
