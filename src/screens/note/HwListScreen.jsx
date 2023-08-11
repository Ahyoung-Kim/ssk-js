import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwList from "../../components/note/HwList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import color from "../../common/color";

const HwListScreen = () => {
  const [editMode, setEditMode] = useState(false);

  const [selectedList, setSelectedList] = useState([]);

  return (
    <>
      <MainLayout headerText={"숙제 노트"} headerType={"back"}>
        <NoteHeader
          text={"숙제 목록"}
          type={"deleteAndWrite"}
          handlePressLeftButton={() => {
            setEditMode(!editMode);
          }}
        />

        <Container>
          <HwList
            editMode={editMode}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
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
    </>
  );
};

export default HwListScreen;

const Container = styled.View`
  padding-horizontal: 15;
`;
