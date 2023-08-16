import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import { dateFormat } from "../../utils/date";
import LeftBarContainer from "../../components/common/LeftBarContainer";
import { FontAwesome5 } from "@expo/vector-icons";
import useIsTutor from "../../hooks/useIsTutor";
import CreateNoteBSheet from "../../components/note/CreateNoteBSheet";
import HwList from "../../components/note/HwList";
import ReviewList from "../../components/note/ReviewList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import client from "../../config/axios";
import Loading from "../../components/common/Loading";
import EmptyMessage from "../../components/common/EmptyMessage";

const SettingIcon = ({ onPress }) => {
  return (
    <FontAwesome5
      onPress={onPress}
      name="cog"
      color={color.COLOR_GRAY_ICON}
      size={16}
    />
  );
};

const ClassNoteScreen = () => {
  const route = useRoute();
  const { date, noteId, tutoringId, startTime } = route.params; // noteId 필요

  const isTutor = useIsTutor();
  const isFocused = useIsFocused();

  const rbRef = useRef();

  const navigation = useNavigation();

  const [noteInfo, setNoteInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const [selectedHwList, setSelectedHwList] = useState([]);
  const [selectedReviewList, setSelectedReviewList] = useState([]);

  const [hwEditMode, setHwEditMode] = useState(false);
  const [reviewEditMode, setReviewEditMode] = useState(false);

  const onPressSettingIcon = (isReview) => {
    if (isReview) {
      setReviewEditMode(!reviewEditMode);
      if (hwEditMode) {
        setHwEditMode(false);
      }
    } else {
      setHwEditMode(!hwEditMode);
      if (reviewEditMode) {
        setReviewEditMode(false);
      }
    }
  };

  const getNoteInfo = async () => {
    setLoading(true);
    try {
      const ret = await client.get(`/api/note/detail/${noteId}`);

      if (ret.status == 200) {
        // console.log("note info: ", ret.data);
        setNoteInfo(ret.data);
      }
    } catch (err) {
      console.log("get note info error: ", err);
      const status = err?.response?.status;

      if (status == 404) {
        // Not found
        setNoteInfo(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getNoteInfo();
    }
  }, [noteId, isFocused]);

  return (
    <>
      <MainLayout
        bgColor={color.COLOR_WHITE_BACKGROUND}
        headerText={"수업 일지"}
        headerLeftType={"back"}
        headerRightType={isTutor ? "pen" : null}
        handlePressHeaderRight={() => rbRef?.current?.open()}
      >
        <NoteHeader text={dateFormat(date)} type="basic" />

        {loading ? (
          <>
            <Loading />
          </>
        ) : noteInfo ? (
          <Contents>
            <LeftBarContainer label={"진도 보고"}>
              <ProgressText>{noteInfo.progress}</ProgressText>
            </LeftBarContainer>

            <Wrapper>
              <LeftBarContainer
                navigate={true}
                label={"숙제 노트"}
                rightIconComponent={
                  isTutor &&
                  noteInfo.assignmentList &&
                  noteInfo.assignmentList.length > 0 ? (
                    <SettingIcon
                      onPress={onPressSettingIcon.bind(this, false)}
                    />
                  ) : (
                    <></>
                  )
                }
                onLabelPress={() =>
                  navigation.navigate("HwListScreen", {
                    tutoringId,
                  })
                }
              />

              <HwList
                hwList={noteInfo.assignmentList}
                editMode={hwEditMode}
                selectedList={selectedHwList}
                setSelectedList={setSelectedHwList}
              />
            </Wrapper>

            <Wrapper>
              <LeftBarContainer
                navigate={true}
                label={"복습 노트"}
                rightIconComponent={
                  isTutor &&
                  noteInfo.reviewList &&
                  noteInfo.reviewList.length > 0 ? (
                    <SettingIcon
                      onPress={onPressSettingIcon.bind(this, true)}
                    />
                  ) : (
                    <></>
                  )
                }
                onLabelPress={() =>
                  navigation.navigate("ReviewListScreen", {
                    tutoringId,
                  })
                }
              />

              <ReviewList
                tutoringId={tutoringId}
                reviewList={noteInfo.reviewList}
                editMode={reviewEditMode}
                selectedList={selectedReviewList}
                setSelectedList={setSelectedReviewList}
              />
            </Wrapper>
          </Contents>
        ) : (
          <>
            <EmptyMessage message="작성된 수업 일지가 없습니다." />
          </>
        )}
      </MainLayout>

      {hwEditMode ||
        (reviewEditMode && (
          <ConfirmButtons
            confirmText={"삭제"}
            buttonColor={color.COLOR_RED_TEXT}
            onCancel={() => {}}
            onConfirm={() => {}}
          />
        ))}

      {/* 진도 복, 숙제 노트, 복습 노트 생성 바텀시트 */}
      <CreateNoteBSheet
        rbRef={rbRef}
        date={date}
        noteId={noteId}
        tutoringId={tutoringId}
        progress={noteInfo?.progress}
        startTime={startTime}
      />
    </>
  );
};

export default ClassNoteScreen;

const Contents = styled.View`
  // background-color: orange;
  padding-horizontal: 15;
`;

const ProgressText = styled.Text`
  font-size: 16;
  padding-vetical: 5;
  line-height: 24;
`;

const Wrapper = styled.View`
  margin-top: 20;
`;

const EmptyText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_GRAY_TEXT};
  text-align: center;
  width: 100%;
  padding-vertical: 50;
`;
