import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useRoute } from "@react-navigation/native";

import { dateFormat } from "../../utils/date";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import TextInputForm from "../../components/inputs/TextInputForm";
import HwFrequencyForm from "../../components/inputs/HwFrequencyForm";
import DateDurationForm from "../../components/inputs/DateDurationForm";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import BigButton from "../../components/common/BigButton";

const CreateHwScreen = () => {
  const route = useRoute();
  const { date, noteId, tutoringId } = route.params;

  // 숙제 내용
  const [body, setBody] = useState("");
  // 시작, 끝 일시
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  // 제출 빈도
  const [frequency, setFrequency] = useState([]);
  // 제출양
  const [amount, setAmount] = useState("");

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        headerText={"숙제 노트 추가"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader type="basic" text={dateFormat(date)} />

        <TextInputForm
          label="숙제 내용"
          value={body}
          onChangeText={setBody}
          placeholder={"숙제 내용을 입력하세요."}
        />

        <TextInputForm
          label="숙제 분량"
          value={amount}
          onChangeText={setAmount}
          placeholder={"숙제 1회 제출 시 제출 분량을 입력하세요."}
        />

        <DateDurationForm
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <HwFrequencyForm frequency={frequency} setFrequency={setFrequency} />
      </MainLayout>

      <BigButton onPress={() => {}} text={"숙제 노트 추가"} />
    </KeyboardAvoidingLayout>
  );
};

export default CreateHwScreen;
