import React, { useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useRoute, useNavigation } from "@react-navigation/native";

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
  const { date, noteId, tutoringId } = route.params; // noteId 필요

  const isTutor = useIsTutor();

  const rbRef = useRef();

  const navigation = useNavigation();

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

  return (
    <>
      <MainLayout
        bgColor={color.COLOR_WHITE_BACKGROUND}
        headerText={"수업 일지"}
        headerLeftType={"back"}
        headerRightType={isTutor ? "pen" : null}
        handlePressHeaderRight={() => rbRef?.current?.open()}
      >
        <NoteHeader text={dateFormat(date)} type="date" />

        <Contents>
          <LeftBarContainer label={"진도 보고"}>
            <ProgressText>
              재작년 6월 고1 국어 모의고사 문제를 풀이했습니다.{"\n"}마저 다
              풀지 못한 문제들은 30일 수업 때 마무리할 계획입니다.
            </ProgressText>
          </LeftBarContainer>

          <Wrapper>
            <LeftBarContainer
              navigate={true}
              label={"숙제 노트"}
              rightIconComponent={
                <SettingIcon onPress={onPressSettingIcon.bind(this, false)} />
              }
              onLabelPress={() => navigation.navigate("HwListScreen")}
            />

            <HwList
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
                <SettingIcon onPress={onPressSettingIcon.bind(this, true)} />
              }
              onLabelPress={() => navigation.navigate("ReviewListScreen")}
            />

            <ReviewList
              editMode={reviewEditMode}
              selectedList={selectedReviewList}
              setSelectedList={setSelectedReviewList}
            />
          </Wrapper>
        </Contents>
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
