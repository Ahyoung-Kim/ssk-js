import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import tags from "../../common/tags";

import BottomSheet from "../common/BottomSheet";
import CalendarBSheetHeader from "./CalendarBSheetHeader";
import LeftBarContainer from "../common/LeftBarContainer";
import TimePicker from "../common/TimePicker";
import SelectTag from "../inputs/SelectTag";
import UserInfo from "../common/UserInfo";
import { serverDateFormat, timeFormatToDate } from "../../utils/date";

import { Alert } from "react-native";
import client from "../../config/axios";
import DatePickerForm from "../inputs/DatePickerForm";

const ScheduleDetailBSheet = ({ rbRef, schedule, date, edit, setRefetch }) => {
  // console.log("schedule: ", schedule);
  const {
    color: tagColor,
    endTime,
    startTime,
    personName,
    profileImageUrl,
    subject,
    tutoringId,
  } = schedule;

  const today = new Date();
  today.setMinutes(0);
  const [startTimeWant, setStartTimeWant] = useState(today);
  const [endTimeWant, setEndTimeWant] = useState(today);
  const [dateWant, setDateWant] = useState(today);

  const [tag, setTag] = useState(0);
  const [description, setDescription] = useState("");

  const handleUpdateSchedule = async () => {
    try {
      const ret = await client.put("/api/schedule", {
        tutoringId,
        date: serverDateFormat(date),
        startTime,
        endTime,
        dateWant: null,
        startTimeWant,
        endTimeWant,
      });

      if (ret.status == 200) {
        Alert.alert("일정 편집", "일정 정보가 편집되었습니다.");
        rbRef?.current?.close();
      }
    } catch (err) {
      console.log("update schedule error: ", err);
      const status = err?.response?.status;

      if (status == 409) {
        // Conflict
        console.log("create schedule: conflict");
        Alert.alert("일정 편집 실패", "해당 시간에 중복되는 수업이 있습니다.");
      }
    }
  };

  useEffect(() => {
    setTag(tagColor);
    setStartTimeWant(timeFormatToDate(startTime));
    setEndTimeWant(timeFormatToDate(endTime));
    setDateWant(date);
  }, [schedule]);

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.9}
        button={edit ? "편집" : null}
        handlePressButton={handleUpdateSchedule}
      >
        <CalendarBSheetHeader date={date} edit={edit} />

        <LeftBarContainer label="Info">
          <UserInfo
            profileImageUrl={profileImageUrl}
            subject={subject}
            name={personName}
          />
        </LeftBarContainer>

        <DatePickerForm
          label="Date"
          date={dateWant}
          setDate={setDateWant}
          leftBar={true}
        />

        <TimePicker
          startTime={startTimeWant}
          setStartTime={setStartTimeWant}
          endTime={endTimeWant}
          setEndTime={setEndTimeWant}
          clickable={edit}
        />

        <LeftBarContainer label="Description">
          {edit ? (
            <DescriptionInput
              multiline={true} //여러줄 입력가능
              textAlignVertical="top" //처음부터 시작 (기본값은 center)
              placeholder="내용을 입력하세요."
              value={description}
              onChangeText={setDescription}
            />
          ) : (
            <DescriptionText>
              디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션
            </DescriptionText>
          )}
        </LeftBarContainer>

        <SelectTag tag={tag} setTag={setTag} edit={false} />
      </BottomSheet>
    </>
  );
};

export default ScheduleDetailBSheet;

const DescriptionInput = styled.TextInput`
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  border-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
  width: 100%;
  height: 150;
  border-radius: 5;
  padding: 7px;
`;

const DescriptionText = styled.Text`
  // font-weight: bold;
  font-size: 16;
  padding-vertical: 5;
  line-height: 24;
`;
