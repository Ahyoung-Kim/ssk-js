import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import TextInputForm from "../../components/inputs/TextInputForm";
import DatePickerForm from "../../components/inputs/DatePickerForm";
import RegularScheduleForm from "../../components/inputs/RegularScheduleForm";
import BigButton from "../../components/common/BigButton";
import { useNavigation, useRoute } from "@react-navigation/native";

import initialRegularDays from "../../constants/initialRegularDays";
import {
  serverDateFormat,
  timeFormatToDate,
  dateToTimeFormat,
} from "../../utils/date";
import client from "../../config/axios";
import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";
import ConfirmButtons from "../../components/common/ConfirmButtons";

import { Alert } from "react-native";

const UpdateClassScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const classInfo = route.params.classInfo;

  // 과목 이름
  const [subject, setSubject] = useState(classInfo.subject);
  // 정규 일정일
  const [days, setDays] = useState(initialRegularDays);
  // 수업 시작일
  const [startDate, setStartDate] = useState(new Date(classInfo.startDate));

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

  const handleUpdateClass = async () => {
    const dayTimeList = parseDays();

    try {
      const ret = await client.put(`/api/tutoring/${classInfo.tutoringId}`, {
        subject,
        startDate: serverDateFormat(startDate),
        dayTimeList,
      });

      if (ret.status == 200) {
        getClassList().then((ret) => {
          dispatch(ret);
          navigation.navigate("ClassInfoScreen", {
            refetch: true,
            tutoringId: classInfo.tutoringId,
          });
        });
      }
    } catch (err) {
      console.log("update class error: ", err);
    }
  };

  const deleteClass = async () => {
    try {
      const ret = await client.delete(`/api/tutoring/${classInfo.tutoringId}`);

      if (ret.status == 200) {
        getClassList().then((ret) => {
          dispatch(ret);
          navigation.navigate("ClassListScreen");
        });
      }
    } catch (err) {
      console.log("delete class error: ", err);
    }
  };

  const handleDeleteClass = () => {
    Alert.alert("수업 삭제", "수업을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: deleteClass,
      },
    ]);
  };

  useEffect(() => {
    const { dayTimeList } = classInfo;

    let selectedDays = {};

    for (let i = 0; i < dayTimeList.length; i++) {
      const { day, startTime, endTime } = dayTimeList[i];
      const targetDay = { ...days[day] };

      const _startTime = timeFormatToDate(startTime);
      const _endTime = timeFormatToDate(endTime);

      selectedDays = {
        ...selectedDays,
        [day]: {
          ...targetDay,
          startTime: _startTime,
          endTime: _endTime,
          selected: true,
        },
      };
    }

    setDays({
      ...days,
      ...selectedDays,
    });
  }, []);

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        headerText={"수업 정보 수정"}
        headerType={"back"}
        bgColor="white"
      >
        <Wrapper>
          <TextInputForm
            label={"과목 이름"}
            placeholder={"과목 이름을 입력하세요."}
            value={subject}
            onChangeText={setSubject}
          />

          <DatePickerForm
            label={"수업 시작일"}
            date={startDate}
            setDate={setStartDate}
          />

          <RegularScheduleForm days={days} setDays={setDays} />
        </Wrapper>
      </MainLayout>

      <ConfirmButtons
        cancelText="삭제"
        confirmText={"수정"}
        filled={true}
        buttonColor={color.COLOR_MAIN}
        onCancel={handleDeleteClass}
        onConfirm={handleUpdateClass}
      />
    </KeyboardAvoidingLayout>
  );
};

export default UpdateClassScreen;

// styled
const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-vertical: 15;
`;
