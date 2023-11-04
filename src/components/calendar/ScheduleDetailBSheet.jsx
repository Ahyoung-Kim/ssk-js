import React, { useRef } from "react";

import styled from "styled-components/native";

import BottomSheet from "../common/BottomSheet";
import CalendarBSheetHeader from "./CalendarBSheetHeader";
import LeftBarContainer from "../common/LeftBarContainer";
import TimePicker from "../common/TimePicker";
import SelectTag from "../inputs/SelectTag";
import UserInfo from "../common/UserInfo";
import { timeFormatToDate } from "../../utils/date";
import UpdateScheduleBSheet from "./UpdateScheduleBSheet";
import { useNavigation } from "@react-navigation/native";

const ScheduleDetailBSheet = ({
  rbRef,
  schedule,
  date,
  edit,
  setRefetch,
  classListRbRef,
}) => {
  // console.log("schedule: ", schedule);
  const {
    color: tagColor,
    endTime,
    startTime,
    personName,
    profileImageUrl,
    subject,
    tutoringId,
    noteId,
  } = schedule;

  const updateScheduleRbRef = useRef();

  const navigation = useNavigation();

  const handlePressEdit = () => {
    updateScheduleRbRef?.current?.open();
  };

  const handlePressButton = () => {
    classListRbRef?.current?.close();
    rbRef?.current?.close();
    navigation.navigate("ClassNoteScreen", {
      date,
      tutoringId,
      noteId,
      startTime,
    });
  };

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.6}
        button="진도 노트"
        handlePressButton={handlePressButton}
        onClose={() => {}}
      >
        <CalendarBSheetHeader
          date={date}
          edit={edit}
          handlePressEdit={handlePressEdit}
        />

        <LeftBarContainer label="Info">
          <UserInfo
            profileImageUrl={profileImageUrl}
            subject={subject}
            name={personName}
          />
        </LeftBarContainer>

        <TimePicker
          startTime={timeFormatToDate(startTime)}
          endTime={timeFormatToDate(endTime)}
          clickable={false}
        />

        {/* <LeftBarContainer label="Description">
          <DescriptionText>
            디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션디스크립션
          </DescriptionText>
        </LeftBarContainer> */}

        <SelectTag tag={tagColor} edit={false} />

        {/* 일정 수정 바텀시트 */}
        {edit && (
          <UpdateScheduleBSheet
            rbRef={updateScheduleRbRef}
            scheduleRbRef={rbRef}
            schedule={schedule}
            date={date}
            setRefetch={setRefetch}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default ScheduleDetailBSheet;

const DescriptionText = styled.Text`
  // font-weight: bold;
  font-size: 16;
  padding-vertical: 5;
  line-height: 24;
`;
