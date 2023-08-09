import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";

import color from "../../common/color";

import BottomSheet from "../common/BottomSheet";
import CalendarBSheetHeader from "./CalendarBSheetHeader";

import ScheduleItem from "./ScheduleItem";

import useIsTutor from "../../hooks/useIsTutor";
import CreateScheduleBSheet from "./CreateScheduleBSheet";
import ScheduleDetailBSheet from "./ScheduleDetailBSheet";

import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";

const CalendarListBSheet = ({ rbRef, selectedItem }) => {
  const isTutor = useIsTutor();
  const dispatch = useDispatch();

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const createScheduleRbRef = useRef();
  const scheduleRbRef = useRef();

  const handlePressButton = () => {
    createScheduleRbRef.current.open();
  };

  const handlePressScheduleItem = (item) => {
    setSelectedSchedule(item);
    scheduleRbRef?.current?.open();
  };

  const dispatchData = async () => {
    getClassList()
      .then((ret) => {
        dispatch(ret);
      })
      .then(() => {
        setRefetch(false);
        rbRef?.current?.close();
        scheduleRbRef?.current?.close();
      });
  };

  useEffect(() => {
    if (refetch) {
      dispatchData();
    }
  }, [refetch]);

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
          setRefetch={setRefetch}
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
