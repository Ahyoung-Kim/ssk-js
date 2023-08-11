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
import client from "../../config/axios";
import Loading from "../common/Loading";
import EmptyClassList from "../common/EmptyClassList";

const CalendarListBSheet = ({ rbRef, selectedItem }) => {
  const isTutor = useIsTutor();
  const dispatch = useDispatch();

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [scheduleList, setScheduleList] = useState(null);

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
        // rbRef?.current?.close();
      });
  };

  const getScheduleList = async () => {
    const date = selectedItem.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    try {
      const ret = await client.get(`/api/schedule/${year}/${month}/${day}`);

      if (ret.status == 200) {
        // console.log(year, month, day);
        // console.log(ret.data);
        setScheduleList(ret.data);
      }
    } catch (err) {
      console.log("CalendarListBsheet getScheduleList error: ", err);
    }
  };

  useEffect(() => {
    if (refetch) {
      getScheduleList();
      dispatchData();
    }
  }, [refetch]);

  useEffect(() => {
    getScheduleList();
  }, [selectedItem]);

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.6}
        button={isTutor ? "일정 추가" : null}
        handlePressButton={handlePressButton}
      >
        <CalendarBSheetHeader date={selectedItem.date} />

        {scheduleList &&
          (scheduleList.length > 0 ? (
            scheduleList.map((item) => {
              return (
                <ScheduleItem
                  key={item.tutoringId}
                  item={item}
                  handlePressScheduleItem={handlePressScheduleItem}
                />
              );
            })
          ) : (
            <>
              <EmptyClassList schedule={true} />
            </>
          ))}

        {/* 일정 추가 바텀시트 */}
        <CreateScheduleBSheet
          rbRef={createScheduleRbRef}
          date={selectedItem.date}
          edit={isTutor}
          setRefetch={setRefetch}
        />

        {/* 일정 디테일 바텀시트 */}
        {selectedSchedule && (
          <ScheduleDetailBSheet
            rbRef={scheduleRbRef}
            schedule={selectedSchedule}
            date={selectedItem.date}
            edit={isTutor}
            setRefetch={setRefetch}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default CalendarListBSheet;
