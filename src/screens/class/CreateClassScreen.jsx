import React, { useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import TextInputForm from "../../components/inputs/TextInputForm";
import DatePickerForm from "../../components/inputs/DatePickerForm";
import RegularScheduleForm from "../../components/inputs/RegularScheduleForm";
import BigButton from "../../components/common/BigButton";

import { dateToTimeFormat, serverDateFormat } from "../../utils/date";

import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../../config/axios";

import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";

import initialRegularDays from "../../constants/initialRegularDays";
import tags from "../../common/tags";
import TagColorForm from "../../components/inputs/TagColorForm";

const CreateClassScreen = () => {
  const dispatch = useDispatch();

  // 과목 이름
  const [subject, setSubject] = useState("");
  // 정규 일정일: 월(1) ~ 일(7)
  const [days, setDays] = useState(initialRegularDays);
  // 수업 시작일
  const [startDate, setStartDate] = useState(new Date());
  // tag color
  const [tagColor, setTagColor] = useState(1);

  const navigation = useNavigation();

  const parseDays = () => {
    const ret = [];

    for (key in days) {
      if (days[key].selected) {
        const day = days[key];
        const item = {
          day: day.value,
          startTime: dateToTimeFormat(day.startTime),
          endTime: dateToTimeFormat(day.endTime),
        };

        ret.push(item);
      }
    }

    return ret;
  };

  const checkInput = (dayTimeList) => {
    let ret = true;

    if (!subject) {
      Alert.alert("입력 오류", "과목 이름을 입력해주세요");
      ret = false;
    } else if (!startDate) {
      Alert.alert("입력 오류", "수업 시작일을 선택해주세요");
      ret = false;
    } else if (dayTimeList.length == 0) {
      Alert.alert("입력 오류", "정규 일정을 선택해주세요");
      ret = false;
    }

    return ret;
  };

  const handleCreateClass = async () => {
    const dayTimeList = parseDays();

    if (!checkInput(dayTimeList)) {
      return;
    } else {
      const body = {
        subject,
        startDate: serverDateFormat(startDate),
        dayTimeList,
        color: Number(tagColor),
      };

      try {
        const ret = await client.post("/api/tutoring", body);

        if (ret.status === 200) {
          getClassList().then((ret) => {
            dispatch(ret);
            navigation.navigate("ClassListScreen");
          });
        }
      } catch (err) {
        console.log("Create class request fail: ", err);
        if (err.response && err.response.status) {
          const status = err.response.status;
          if (status == 409) {
            // 수업 충돌
            Alert.alert(
              "수업 겹침",
              "동일한 시간대에 겹치는 수업이 존재합니다."
            );
          } else if (status == 400) {
            // Bad Request
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingLayout>
      <MainLayout headerText={"수업 생성"} headerType={"back"} bgColor="white">
        <Wrapper>
          <TextInputForm
            label="과목 이름"
            placeholder={"과목 이름을 입력하세요."}
            value={subject}
            onChangeText={setSubject}
          />

          <DatePickerForm
            label="수업 시작일"
            date={startDate}
            setDate={setStartDate}
          />

          <RegularScheduleForm days={days} setDays={setDays} />

          <TagColorForm tagColor={tagColor} setTagColor={setTagColor} />
        </Wrapper>
      </MainLayout>

      <BigButton onPress={handleCreateClass} text="수업 생성" />
    </KeyboardAvoidingLayout>
  );
};

export default CreateClassScreen;

// styled
const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-vertical: 15;
  // background-color: orange;
`;
