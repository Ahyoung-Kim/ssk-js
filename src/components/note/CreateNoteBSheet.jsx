import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import BottomSheet from "../common/BottomSheet";

import { dh } from "../../common/windowSize";
import { useNavigation } from "@react-navigation/native";
import {
  dateFormat,
  serverDateFormat,
  timeFormatToDate,
  tutoringTimeFormat,
} from "../../utils/date";
import { Alert } from "react-native";
import client from "../../config/axios";
import { useDispatch } from "react-redux";
import { getClassNote } from "../../redux/actions/classNoteAction";
import { getReviewList } from "../../redux/actions/reviewListAction";
import { getAssignmentList } from "../../redux/actions/assignmentListAction";
import { clearClassInfo } from "../../redux/actions/classInfoAction";
import { clearClassListInfo } from "../../redux/actions/classListInfoAction";

const CreateNoteBSheet = ({
  rbRef,
  date,
  noteId,
  tutoringId,
  progress,
  startTime,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goCreateProgressScreen = () => {
    const tutoringTime = tutoringTimeFormat(date, startTime);
    // console.log(tutoringTime);
    rbRef?.current?.close();
    navigation.navigate("CreateProgressScreen", {
      date,
      noteId,
      tutoringId,
      prevStates: {
        progress,
        tutoringTime,
      },
    });
  };

  const handleDeleteClassNote = async () => {
    try {
      const ret = await client.delete(`/api/note/${noteId}`);

      if (ret.status == 200) {
        await getClassNote(noteId).then((ret) => dispatch(ret));
        await getReviewList(tutoringId).then((ret) => dispatch(ret));
        await getAssignmentList(tutoringId).then((ret) => dispatch(ret));
        dispatch(clearClassInfo());
        dispatch(clearClassListInfo());

        rbRef?.current?.close();
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (err) {
      console.log("delete class note error: ", err);
    }
  };

  const onPressDeleteNote = () => {
    Alert.alert(
      "수업 일지 삭제",
      `${serverDateFormat(date)} 일자 수업 일지를 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: handleDeleteClassNote,
        },
      ]
    );
  };

  // const goCreateHwScreen = () => {
  //   rbRef?.current?.close();
  //   navigation.navigate("CreateHwScreen", {
  //     date,
  //     tutoringId,
  //   });
  // };

  // const goCreateReviewScreen = () => {
  //   rbRef?.current?.close();
  //   navigation.navigate("CreateReviewScreen", {
  //     date,
  //     tutoringId,
  //   });
  // };

  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.3}>
        {!progress && (
          <TouchableArea onPress={goCreateProgressScreen}>
            <Text>수업 일지 생성</Text>
          </TouchableArea>
        )}

        {progress && (
          <>
            <TouchableArea onPress={goCreateProgressScreen}>
              <Text>진도 보고 수정</Text>
            </TouchableArea>
            <TouchableArea onPress={onPressDeleteNote}>
              <Text>수업 일지 삭제</Text>
            </TouchableArea>
          </>
        )}

        {/* <TouchableArea onPress={goCreateHwScreen}>
          <Text>숙제 노트 작성</Text>
        </TouchableArea>
        <TouchableArea onPress={goCreateReviewScreen}>
          <Text>복습 노트 작성</Text>
        </TouchableArea> */}
      </BottomSheet>
    </>
  );
};

export default CreateNoteBSheet;

const TouchableArea = styled.TouchableOpacity`
  //   background-color: orange;
  width: 100%;
  height: ${dh * 0.05};
  padding-horizontal: 10;
  justify-content: center;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 18;
`;
