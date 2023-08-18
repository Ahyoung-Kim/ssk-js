import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import client from "../../config/axios";

import BottomSheet from "../common/BottomSheet";
import CalendarBSheetHeader from "./CalendarBSheetHeader";
import TimePicker from "../common/TimePicker";
import DropDownForm from "../inputs/DropDownForm";

import { dateToTimeFormat, serverDateFormat } from "../../utils/date";
import useClassList from "../../hooks/useClassList";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { getClassInfo } from "../../redux/actions/classInfoAction";
import { clearClassListInfo } from "../../redux/actions/classListInfoAction";

const CreateScheduleBSheet = ({ rbRef, date, edit, setRefetch }) => {
  const classList = useClassList();
  const dispatch = useDispatch();

  const today = new Date();
  today.setMinutes(0);
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(today);
  const [tutoringId, setTutoringId] = useState(null);

  // 일정 등록 버튼
  const handlePressButton = async () => {
    if (!tutoringId) {
      Alert.alert("수업을 선택해주세요!");
      return;
    }

    try {
      // tutoringId, date(YYYY-MM-DD), startTime(TT:mm), endTime(TT:mm)
      const data = {
        tutoringId,
        date: serverDateFormat(date),
        startTime: dateToTimeFormat(startTime),
        endTime: dateToTimeFormat(endTime),
      };

      const ret = await client.post("/api/schedule", data);

      if (ret.status == 200) {
        Alert.alert("일정 등록", "일정이 등록되었습니다.");
        await getClassInfo(
          tutoringId,
          date.getFullYear(),
          date.getMonth() + 1
        ).then((ret) => dispatch(ret));

        setRefetch(true);
        rbRef?.current?.close();
      }
    } catch (err) {
      console.log("일정 등록 api 실패: ", err);
      const status = err?.response?.status;
      if (status == 409) {
        console.log("create schedule: conflict");
        Alert.alert("일정 등록 실패", "해당 시간에 중복되는 수업이 있습니다.");
      } else if (status == 400) {
        console.log("create schedule: not found");
      }
    }
  };

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.6}
        button="일정 등록"
        handlePressButton={handlePressButton}
      >
        <CalendarBSheetHeader date={date} />

        <DropDownForm
          label="수업 선택"
          placeholder={"수업을 선택해주세요."}
          list={classList}
          textKey={"subject"}
          paddingHorizontal={0}
          menuHeight={160}
          onPressItem={(item) => setTutoringId(item.tutoringId)}
        />

        <TimePickerContainer>
          <TimePicker
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </TimePickerContainer>
      </BottomSheet>
    </>
  );
};

export default CreateScheduleBSheet;

const TimePickerContainer = styled.View`
  margin-vertical: 15;
`;
