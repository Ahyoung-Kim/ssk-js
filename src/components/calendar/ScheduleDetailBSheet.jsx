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
import { timeFormatToDate } from "../../utils/date";

const ScheduleDetailBSheet = ({ rbRef, schedule, date, edit }) => {
  // console.log("schedule: ", schedule);
  const {
    color: tagColor,
    endTime: originalEndTime,
    startTime: originalStartTime,
    personName,
    profileImageUrl,
    subject,
    tutoringId,
  } = schedule;

  const today = new Date();
  today.setMinutes(0);
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(today);

  const [tag, setTag] = useState(0);
  const [description, setDescription] = useState("");

  const handlePressButton = () => {
    rbRef?.current?.close();
  };

  useEffect(() => {
    setTag(tagColor);
    setStartTime(timeFormatToDate(originalStartTime));
    setEndTime(timeFormatToDate(originalEndTime));
  }, [schedule]);

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.9}
        button={edit ? "편집" : null}
        handlePressButton={handlePressButton}
      >
        <CalendarBSheetHeader date={date} edit={edit} />

        <LeftBarContainer label="Info">
          <UserInfo
            profileImageUrl={profileImageUrl}
            subject={subject}
            name={personName}
          />
        </LeftBarContainer>

        <TimePicker
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
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

        <SelectTag tag={tag} setTag={setTag} />
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
