import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useRoute } from "@react-navigation/native";

import { dateFormat } from "../../utils/date";

import MainLayout from "../../components/common/MainLayout";
import TextInputForm from "../../components/inputs/TextInputForm";
import NoteHeader from "../../components/note/NoteHeader";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import BigButton from "../../components/common/BigButton";

const CreateProgressScreen = ({}) => {
  const route = useRoute();
  const { date, noteId, tutoringId } = route.params;

  const [progress, setProgress] = useState("");

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        bgColor="white"
        headerText={"진도 보고 작성"}
        headerLeftType={"back"}
      >
        <NoteHeader type="basic" text={dateFormat(date)} />
        <Container>
          <TextInputForm
            label="진도 보고"
            value={progress}
            onChangeText={setProgress}
            height={200}
            multiline={true}
            placeholder={"오늘자 수업의 진도 보고를 작성하세요."}
          />
        </Container>
      </MainLayout>

      <BigButton onPress={() => {}} text="진도 보고 작성" />
    </KeyboardAvoidingLayout>
  );
};

export default CreateProgressScreen;

const Container = styled.View`
  //   background-color: orange;
`;
