import React, { useState } from "react";
import styled from "styled-components/native";
import MainLayout from "../../components/common/MainLayout";
import ContinuingReview from "../../components/reviewNote/ContinuingReview";
import color from "../../common/color";
import { Ionicons } from "@expo/vector-icons";
import FinishedReview from "../../components/reviewNote/FinishedReview";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import TextInputForm from "../../components/inputs/TextInputForm";
import { TouchableOpacity, TextInput, StyleSheet, View } from "react-native";
import NoteTop from "./NoteTop";
const ReviewListPage = () => {
  const [task, setTask] = useState();

  const handleAddTask = (value) => {
    clickProps.addTask(value);
    setTask(null);
  };
  const onPress = () => {
    console.log(task);
  };
  return (
    <KeyboardAvoidingLayout>
      <MainLayout headerText={"복습 노트"} headerLeftType={"back"}>
        <InnerWrapper>
          <NoteTop />
          <ContinuingReview />
          <FinishedReview />
        </InnerWrapper>
        <InputWrapper>
          <Container>
            <TextInput
              style={styles.inputField}
              value={task}
              onChangeText={(text) => setTask(text)}
              placeholder={"Write a task"}
            />
          </Container>
          <TouchableOpacity onPress={() => handleAddTask(task)}>
            <View style={styles.button}>
              <Ionicons name="arrow-up-outline" size={30} color="#0C9BFB" />
            </View>
          </TouchableOpacity>
        </InputWrapper>
      </MainLayout>
    </KeyboardAvoidingLayout>
  );
};

export default ReviewListPage;

const InnerWrapper = styled.View`
  margin-horizontal: 20;
`;

const InputWrapper = styled.View`
  flex-direction: row;
`;

const Container = styled.TextInput`
  width: 80%;
  height: 100%;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  border-color: ${color.COLOR_MAIN};
  border-width: 1;
  border-radius: 5px;
  padding-horizontal: 15;
  margin-horizontal: 15;
  font-size: 16;
  align-items: center;
`;

const styles = StyleSheet.create({
  inputField: {
    color: "#fff",
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
