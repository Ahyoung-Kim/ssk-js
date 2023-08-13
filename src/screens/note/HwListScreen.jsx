import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwList from "../../components/note/HwList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import color from "../../common/color";
import client from "../../config/axios";
import { useRoute } from "@react-navigation/core";

const HwListScreen = () => {
  const route = useRoute();
  const { tutoringId } = route.params;

  const [editMode, setEditMode] = useState(false);

  const [selectedList, setSelectedList] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);

  const getAssignmentList = async () => {
    try {
      const ret = await client.post("/api/assignment/list", {
        tutoringId,
      });

      if (ret.status == 200) {
        // console.log(ret.data);
        setAssignmentList(ret.data);
      }
    } catch (err) {
      console.log("get assignment list error: ", err);
      const status = err?.response?.status;

      if (status == 404) {
        setAssignmentList([]);
      }
    }
  };

  useEffect(() => {
    getAssignmentList();
  }, [tutoringId]);

  return (
    <>
      <MainLayout headerText={"숙제 노트"} headerLeftType={"back"}>
        <NoteHeader
          text={"숙제 목록"}
          type={"deleteAndWrite"}
          handlePressLeftButton={() => {
            setEditMode(!editMode);
          }}
        />

        <Container>
          <HwList
            hwList={assignmentList}
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
