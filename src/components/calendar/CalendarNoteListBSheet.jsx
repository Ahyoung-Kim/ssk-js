import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import BottomSheet from "../common/BottomSheet";
import CalendarBSheetHeader from "./CalendarBSheetHeader";
import EmptyMessage from "../common/EmptyMessage";
import client from "../../config/axios";
import { StyleSheet, Platform, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import tags from "../../common/tags";
import { useNavigation } from "@react-navigation/native";
import useClassNote from "../../hooks/useClassNote";

const NoteItem = ({ note, date, rbRef }) => {
  const { color: tagColor, noteId, tutoringId } = note;

  const noteInfo = useClassNote(noteId);

  const navigation = useNavigation();

  const onPress = () => {
    rbRef?.current?.close();
    setTimeout(() => {
      navigation.navigate("ClassNoteScreen", {
        noteId,
        tutoringId,
        date,
      });
    }, 300);
  };

  if (!noteInfo) {
    return <></>;
  }

  return (
    <>
      <Pressable style={styles.container} onPress={onPress}>
        <NoteWrapper>
          <FontAwesome5 name="book" color={tags[tagColor]} size={20} />
          <ProgressText numberOfLines={1} ellipsizeMode="tail">
            {noteInfo.progress}
          </ProgressText>
        </NoteWrapper>

        <FontAwesome5
          name="angle-right"
          size={24}
          color={color.COLOR_GRAY_ICON}
        />
      </Pressable>
    </>
  );
};

const CalendarNoteListBSheet = ({ rbRef, selectedItem }) => {
  const { date, noteList } = selectedItem;

  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.6}>
        <CalendarBSheetHeader date={selectedItem?.date} />

        {!noteList || noteList?.length == 0 ? (
          <>
            <EmptyMessage message={"작성된 수업 일지가 없습니다."} />
          </>
        ) : (
          <>
            {noteList.map((note) => (
              <NoteItem
                key={`noteItem_${note.noteId}`}
                note={note}
                date={date}
                rbRef={rbRef}
              />
            ))}
          </>
        )}
      </BottomSheet>
    </>
  );
};

export default CalendarNoteListBSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.COLOR_WHITE_BACKGROUND,
    width: "98%",
    height: 55,
    borderRadius: 5,
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 7,
    ...Platform.select({
      ios: {
        shadowColor: color.COLOR_BOX_SHADOW,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

const NoteWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-shrink: 1;
`;

const ProgressText = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-horizontal: 15;
  flex-shrink: 1;
`;
