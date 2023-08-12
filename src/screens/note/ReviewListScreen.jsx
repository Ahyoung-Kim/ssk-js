import React, { useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import ReviewList from "../../components/note/ReviewList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import ReviewListBSheet from "./ReviewListBSheet";

const ReviewListContainer = ({ children, text }) => {
  const [open, setOpen] = useState(true);

  const onPressHeader = () => {
    setOpen(!open);
  };

  return (
    <>
      <ReviewListWrapper>
        <ReviewListHeader onPress={onPressHeader}>
          <HeaderText>{text}</HeaderText>
          <FontAwesome5
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color={color.COLOR_MAIN}
          />
        </ReviewListHeader>

        {open && <>{children}</>}
      </ReviewListWrapper>
    </>
  );
};

const ReviewListScreen = () => {
  const [editMode, setEditMode] = useState(false);

  const [selectedList, setSelectedList] = useState([]);

  const rbRef = useRef();

  return (
    <>
      <MainLayout
        headerText={"복습 노트"}
        headerLeftType={"back"}
        headerRightType={"setting"}
        handlePressHeaderRight={() => rbRef?.current?.open()}
      >
        <NoteHeader
          text={"복습 목록"}
          type={"delete"}
          handlePressLeftButton={() => setEditMode(!editMode)}
        />

        <Container>
          <ReviewListContainer text={"진행 중인 복습"}>
            <ReviewList
              editMode={editMode}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          </ReviewListContainer>

          <ReviewListContainer text={"완료된 복습"}>
            <ReviewList
              editMode={editMode}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              completed={true}
            />
          </ReviewListContainer>
        </Container>
      </MainLayout>

      {editMode && (
        <ConfirmButtons
          cancelText="취소"
          confirmText={"삭제"}
          onCancel={() => {
            setEditMode(false);
          }}
          onConfirm={() => {}}
          buttonColor={color.COLOR_RED_TEXT}
        />
      )}

      <ReviewListBSheet rbRef={rbRef} />
    </>
  );
};

export default ReviewListScreen;

const Container = styled.View`
  padding-horizontal: 15;
`;

const ReviewListWrapper = styled.View`
  //   background-color: orange;
  margin-bottom: 50;
`;

const ReviewListHeader = styled.Pressable`
  padding-vertical: 7;
  padding-horizontal: 5;
  border-bottom-width: 2;
  border-color: ${color.COLOR_MAIN};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10;
`;

const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 20;
  color: ${color.COLOR_MAIN};
`;
