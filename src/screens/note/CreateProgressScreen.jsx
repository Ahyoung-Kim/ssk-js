import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { dateFormat } from "../../utils/date";

import MainLayout from "../../components/common/MainLayout";
import TextInputForm from "../../components/inputs/TextInputForm";
import NoteHeader from "../../components/note/NoteHeader";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import BigButton from "../../components/common/BigButton";
import PrevNextButtons from "../../components/common/PrevNextButtons";
import client from "../../config/axios";
import { useDispatch } from "react-redux";
import { getClassNote } from "../../redux/actions/classNoteAction";

const CreateProgressScreen = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {
    date,
    noteId,
    tutoringId,
    prevStates: { progress: progressData, tutoringTime },
  } = route.params;

  const [progress, setProgress] = useState("");

  const onPressNext = () => {
    if (!progress) {
      Alert.alert("진도 보고 내용을 작성해주세요!");
      return;
    }
    navigation.navigate("CreateHwScreen", {
      date,
      noteId,
      tutoringId,
      prevStates: {
        progress,
        tutoringTime,
      },
    });
  };

  const handleUpdateProgress = async () => {
    try {
      const ret = await client.put(`/api/note/${noteId}`, {
        progress,
      });

      if (ret.status == 200) {
        await getClassNote(noteId).then((ret) => dispatch(ret));

        Alert.alert("진도 보고 내용이 수정되었습니다.");
        navigation.navigate("ClassNoteScreen", {
          date,
          noteId,
          tutoringId,
        });
      }
    } catch (err) {
      console.log("update progress err: ", err);
    }
  };

  useEffect(() => {
    if (progressData) {
      setProgress(progressData);
    }
  }, [progressData]);

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

      {progressData ? (
        <BigButton onPress={handleUpdateProgress} text="진도 보고 편집" />
      ) : (
        <PrevNextButtons onPressNext={onPressNext} />
      )}
    </KeyboardAvoidingLayout>
  );
};

export default CreateProgressScreen;

const Container = styled.View`
  // background-color: orange;
`;
