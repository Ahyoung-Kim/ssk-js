import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";

import color from "../../common/color";

import BottomSheet from "../common/BottomSheet";
import CalendarBSheetHeader from "./CalendarBSheetHeader";

import ScheduleItem from "./ScheduleItem";

import useIsTutor from "../../hooks/useIsTutor";
import CreateScheduleBSheet from "./CreateScheduleBSheet";
import ScheduleDetailBSheet from "./ScheduleDetailBSheet";

const CalendarListBSheet = ({ rbRef, selectedItem }) => {
  const isTutor = useIsTutor();

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const createScheduleRbRef = useRef();
  const scheduleRbRef = useRef();

  const handlePressButton = () => {
    createScheduleRbRef.current.open();
  };

  const handlePressScheduleItem = (item) => {
    setSelectedSchedule(item);
    scheduleRbRef?.current?.open();
  };

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.6}
        button={isTutor ? "일정 추가" : null}
        handlePressButton={handlePressButton}
      >
        <CalendarBSheetHeader date={selectedItem.date} edit={isTutor} />

        {[0, 1, 2].map((item) => {
          return (
            <ScheduleItem
              key={item.tutoringId}
              item={item}
              handlePressScheduleItem={handlePressScheduleItem}
            />
          );
        })}

        {/* 일정 추가 바텀시트 */}
        <CreateScheduleBSheet
          rbRef={createScheduleRbRef}
          date={selectedItem.date}
          edit={isTutor}
        />

        {/* 일정 디테일 바텀시트 */}
        <ScheduleDetailBSheet
          rbRef={scheduleRbRef}
          schedule={selectedSchedule}
          date={selectedItem.date}
          edit={isTutor}
        />
      </BottomSheet>
    </>
  );
};

export default CalendarListBSheet;
