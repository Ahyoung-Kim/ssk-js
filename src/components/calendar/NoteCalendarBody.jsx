import React, { useEffect, useRef, useState } from "react";

import { FlatList } from "react-native";

import color from "../../common/color";
import styled, { css } from "styled-components/native";

import { CalendarDays } from "./CalendarBody";
import {
  Container,
  CalendarDay,
  CalendarDayText,
  TagView,
  Tag,
} from "./CalendarBody";

import tags from "../../common/tags";
import { noteCalendarDays, compareDates } from "../../utils/date";

const NoteCalendarBody = ({
  selectedDate,
  selectedMonth,
  selectedYear,
  handlePressDate,
  noteListInfo,
}) => {
  const today = new Date();
  const [totalDays, setTotalDays] = useState([]);

  const rbRef = useRef();

  const [selectedItem, setSelectedItem] = useState(null);

  const onPress = (item) => {
    handlePressDate(item.date);
    setSelectedItem(item);
    rbRef?.current?.open();
  };

  const setNoteListDays = () => {
    const days = noteCalendarDays(selectedMonth, selectedYear, noteListInfo);

    // console.log("note days: ", days);
    setTotalDays(days);
  };

  useEffect(() => {
    if (!noteListInfo) {
      setNoteListDays();
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (noteListInfo) {
      setNoteListDays();
    }
  }, [noteListInfo]);

  useEffect(() => {
    if (!selectedItem && totalDays && totalDays.length > 0) {
      setSelectedItem(totalDays[0]);
    }
  }, [totalDays]);

  const renderItem = ({ item }) => {
    return (
      <CalendarDay
        today={compareDates(today, item.date)}
        selected={compareDates(selectedDate, item.date)}
        height={70}
        onPress={onPress.bind(this, item)}
      >
        <CalendarDayText state={item.state}>{item.num}</CalendarDayText>

        {item.mark && item.noteList && item.noteList.length > 0 ? (
          <TagView>
            {item.noteList.map((note) => {
              //   console.log(note);
              return <Tag tagColor={tags[note.color]} />;
            })}
          </TagView>
        ) : null}
      </CalendarDay>
    );
  };

  if (!noteListInfo) {
    return;
  }

  //   console.log(noteListInfo[0].noteList);

  return (
    <>
      <Container>
        <CalendarDays />

        <FlatList
          data={totalDays}
          numColumns={7}
          keyExtractor={(item) =>
            `${item.date}_${item.state}_${selectedMonth}_${selectedYear}`
          }
          scrollEnabled={false}
          renderItem={renderItem}
        />

        {/* 일지 목록 바텀시트 */}
        {selectedItem && <></>}
      </Container>
    </>
  );
};

export default NoteCalendarBody;
