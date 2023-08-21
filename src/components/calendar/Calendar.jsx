import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";

import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import CalendarDatePicker from "./CalendarDatePicker";
import NoteCalendarBody from "./NoteCalendarBody";

const Calendar = ({
  onChangeDate = () => {},
  onChangeYearMonth = () => {},
  tutoringList,
  classInfo,
}) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(today);
  // 선택한 월
  const [selectedMonth, setSelectedMonth] = useState(month);
  // 선택한 년
  const [selectedYear, setSelectedYear] = useState(year);

  // date picker 보여짐 여부
  const [showPicker, setShowPicker] = useState(false);

  // 달력 모드: 일지 달력 or 일정 달력
  const [scheduleMode, setScheduleMode] = useState(true);
  const [noteListInfo, setNoteListInfo] = useState([]);

  // 헤더 chevron 아이콘 클릭 시 실행되는 이벤트 함수
  // 월 이동
  // dir = -1: 이전달, 1: 다음달
  const handleMoveMonth = (dir) => {
    let year = selectedYear;
    let month = selectedMonth;

    if (selectedMonth === 1 && dir === -1) {
      year -= 1;
      month = 12;
    } else if (selectedMonth === 12 && dir === 1) {
      year += 1;
      month = 1;
    } else {
      month += dir;
    }

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // 날짜 타일 클릭 시 실행되는 이벤트 함수
  const handlePressDate = (date) => {
    setSelectedDate(date);
  };

  // today 버튼 클릭 시 실행되는 이벤트 함수
  const handlePressToday = () => {
    setSelectedDate(today);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // 헤더 글씨 클릭 시 실행되는 이벤트 함수
  const handleToggleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  // date picker 에서 날짜 선택 시 실행되는 이벤트 함수
  const handlePickDate = (date) => {
    setShowPicker(false);

    setSelectedDate(date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    onChangeDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    onChangeYearMonth(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (tutoringList && !classInfo) {
      setNoteListInfo(
        tutoringList
          .filter((tutoring) => tutoring.noteList.length > 0)
          .map((tutoring) => ({
            color: tutoring.color,
            noteList: tutoring.noteList,
            tutoringId: tutoring.tutoringId,
          }))
      );
    } else if (!tutoringList && classInfo) {
      setNoteListInfo([
        {
          color: classInfo.color,
          noteList: classInfo.noteList,
          tutoringId: classInfo.tutoringId,
        },
      ]);
    }
  }, [tutoringList, classInfo]);

  return (
    <Container>
      {/* 년 & 월 보여주는 캘린더 헤더 */}
      <CalendarHeader
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        handleMoveMonth={handleMoveMonth}
        handleToggleShowPicker={handleToggleShowPicker}
      />

      <ButtonWrapper>
        {/* 일정 달력 <-> 일지 달력 전환 버튼 */}
        <Button
          btnColor={color.COLOR_LAVENDER}
          onPress={() => setScheduleMode(!scheduleMode)}
        >
          <FontAwesome5
            name={scheduleMode ? "book" : "calendar-alt"}
            size={12}
            color={color.COLOR_LAVENDER}
            style={{ marginRight: 3 }}
          />
          <ButtonText btnColor={color.COLOR_LAVENDER}>
            {scheduleMode ? "일지" : "일정"} 보기
          </ButtonText>
        </Button>
        {/* 오늘 날짜로 이동하는 버튼 */}
        <Button btnColor={color.COLOR_MAIN} onPress={handlePressToday}>
          <ButtonText btnColor={color.COLOR_MAIN}>today</ButtonText>
        </Button>
      </ButtonWrapper>

      {/* 캘린더 바디 */}
      {scheduleMode ? (
        <CalendarBody
          tutoringList={tutoringList}
          classInfo={classInfo}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          handlePressDate={handlePressDate}
          handleMoveMonth={handleMoveMonth}
        />
      ) : (
        <NoteCalendarBody
          noteListInfo={noteListInfo}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          handlePressDate={handlePressDate}
          handleMoveMonth={handleMoveMonth}
        />
      )}

      {/* 캘린더 Date Picker 컴포넌트 */}
      {showPicker && (
        <CalendarDatePicker
          setShowPicker={setShowPicker}
          selectedDate={selectedDate}
          handlePickDate={handlePickDate}
        />
      )}
    </Container>
  );
};

export default Calendar;

const Container = styled.View`
  background-color: ${color.COLOR_WHITE_BACKGROUND};
`;

const ButtonWrapper = styled.View`
  margin-bottom: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.Pressable`
  align-self: flex-end;
  border-color: ${({ btnColor }) => btnColor};
  border-width: 1;
  border-radius: 100;
  padding-horizontal: 7;
  padding-vertical: 3;
  margin-horizontal: 10;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 12;
  color: ${({ btnColor }) => btnColor};
`;
