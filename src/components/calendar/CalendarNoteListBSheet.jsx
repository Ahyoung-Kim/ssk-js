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

const NoteItem = ({ note }) => {
  const { color: tagColor, noteId } = note;
  const [noteInfo, setNoteInfo] = useState(null);
  const navigation = useNavigation();

  const onPress = () => {};

  const getNoteInfo = async () => {
    try {
      const ret = await client.get(` /api/note/detail/${noteId}`);

      if (ret.status == 200) {
        console.log("data: ", ret.data);
        setNoteInfo(ret.data);
      }
    } catch (err) {
      console.log("get calendar note item error: ", err);
    }
  };

  //   useEffect(() => {
  //     getNoteInfo();
  //   }, [note]);

  return (
    <>
      <Pressable style={styles.container}>
        <NoteWrapper>
          <FontAwesome5 name="check" color={tags[tagColor]} size={20} />
          <ProgressText>진도 보고 내용</ProgressText>
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
              <NoteItem key={`noteItem_${note.noteId}`} note={note} />
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
`;

const ProgressText = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-left: 15;
`;
