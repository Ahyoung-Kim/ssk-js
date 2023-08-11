import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/native";

import { FlatList } from "react-native";
import color from "../../common/color";
import { CalendarStates, Days } from "../../constants/calendar";
import {
  calendarDays,
  compareDates,
  dateFormat,
  getTotalDays,
} from "../../utils/date";
import CalendarListBSheet from "./CalendarListBSheet";
import tags from "../../common/tags";

// 요일(월, 화, 수, 목, 금, 토, 일) 컴포넌트
const CalendarDays = () => {
  const renderItem = ({ item }) => {
    return (
      <CalendarDay>
        <CalendarDayText state={item.state}>{item.text}</CalendarDayText>
      </CalendarDay>
    );
  };
  return (
    <FlatList
      data={Days}
      numColumns={7}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.state}_${item.text}`}
      scrollEnabled={false}
    />
  );
};

const CalendarBody = ({
  selectedDate,
  selectedMonth,
  selectedYear,
  handlePressDate,
  tutoringList,
  classInfo,
}) => {
  const today = new Date();
  // 현재 월의 모든 날짜 보여주기 위한 배열 state
  // 이전 달의 마지막 n 개의 날짜 + 현재 달 날짜 + 다음 달 처음 m 개의 날짜
  // 각 날짜는 { state, num, date, day, mark } 로 이루어져 있음
  const [totalDays, setTotalDays] = useState([]);

  // 바텀시트 ref
  const rbRef = useRef();
  // selectedItem for bottom sheet
  const [selectedItem, setSelectedItem] = useState(null);

  const onPress = (item) => {
    handlePressDate(item.date);
    setSelectedItem(item);
    rbRef?.current?.open();
  };

  const setTutoringListDays = () => {
    const days = calendarDays(selectedMonth, selectedYear, tutoringList);

    // console.log(days);
    setTotalDays(days);
  };

  const setScheduleListDays = () => {
    const days = getTotalDays(
      selectedMonth,
      selectedYear,
      classInfo?.scheduleList
    );
    // console.log(days);

    setTotalDays(days);
  };

  useEffect(() => {
    if (!classInfo && !tutoringList) {
      setScheduleListDays();
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (!selectedItem && totalDays && totalDays.length > 0) {
      setSelectedItem(totalDays[0]);
    }
  }, [totalDays]);

  useEffect(() => {
    if (classInfo) {
      setScheduleListDays();
    }
  }, [classInfo]);

  useEffect(() => {
    if (tutoringList) {
      setTutoringListDays();
    }
  }, [tutoringList]);

  // 날짜 타일 렌더링 아이템
  const renderItem = ({ item }) => {
    return (
      <CalendarDay
        today={compareDates(today, item.date)}
        selected={compareDates(selectedDate, item.date)}
        height={70}
        onPress={onPress.bind(this, item)}
      >
        <CalendarDayText state={item.state}>{item.num}</CalendarDayText>

        {item.mark ? (
          <TagView>
            {classInfo ? (
              <Tag tagColor={tags[classInfo?.color]} />
            ) : tutoringList ? (
              item.tutoringIndices.map((tutoringIndex) => {
                return (
                  <Tag tagColor={tags[tutoringList[tutoringIndex]?.color]} />
                );
              })
            ) : null}
          </TagView>
        ) : null}
      </CalendarDay>
    );
  };

  return (
    <Container>
      <CalendarDays />

      <FlatList
        data={totalDays}
        numColumns={7}
        renderItem={renderItem}
        keyExtractor={(item) =>
          `${item.date}_${item.state}_${selectedMonth}_${selectedYear}`
        }
        scrollEnabled={false}
      />

      {/* 캘린더 바텀시트 */}
      {selectedItem && (
        <CalendarListBSheet rbRef={rbRef} selectedItem={selectedItem} />
      )}
    </Container>
  );
};

export default CalendarBody;

const Container = styled.View`
  width: 100%;
`;

const CalendarDay = styled.Pressable`
  flex: 1;
  height: ${({ height }) => (height ? height : "auto")};
  align-items: center;
  padding-vertical: 7;
  padding-horizontal: 3;
  background-color: ${({ today, selected }) =>
    selected
      ? color.COLOR_CALENDAR_SELECTED
      : today
      ? color.COLOR_CALENDAR_TODAY
      : color.COLOR_WHITE_BACKGROUND};
`;

const CalendarDayText = styled.Text`
  font-weight: 600;
  color: ${({ state }) => {
    if (state === CalendarStates.sun) {
      return `${color.COLOR_RED_TEXT}`;
    } else if (state === CalendarStates.sat) {
      return `${color.COLOR_BLUE_TEXT}`;
    } else if (state === CalendarStates.prev || state === CalendarStates.next) {
      return `${color.COLOR_LIGHTGRAY_TEXT}`;
    }
  }};
  margin-bottom: 5;
`;

const TagView = styled.View`
  // background-color: orange;
  width: 100%;
  //   height: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Tag = styled.View`
  width: 7;
  height: 7;
  border-radius: 100;
  background-color: ${({ tagColor }) => tagColor};
  margin-horizontal: 3;
  margin-vertical: 5;
`;
