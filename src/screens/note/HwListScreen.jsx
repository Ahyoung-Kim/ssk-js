import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwList from "../../components/note/HwList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import color from "../../common/color";
import client from "../../config/axios";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import Loading from "../../components/common/Loading";
import { Alert } from "react-native";
import useIsTutor from "../../hooks/useIsTutor";
import useAssignmentList from "../../hooks/useAssignmentList";
import { useDispatch, useSelector } from "react-redux";
import { getAssignmentList } from "../../redux/actions/assignmentListAction";

const HwListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tutoringId } = route.params;

  const dispatch = useDispatch();
  const isTutor = useIsTutor();

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedList, setSelectedList] = useState([]);
  const assignmentList = useAssignmentList(tutoringId);
  // console.log("assignmentList: ", assignmentList);

  const handleDeleteAssignments = () => {
    Alert.alert("숙제 목록 삭제", "선택한 숙제 목록을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: async () => {
          const assignmentIdList = selectedList.map((el) => el.id);

          try {
            const ret = await client.post(`/api/assignment/multi-delete`, {
              assignmentIdList,
            });

            if (ret.status == 200) {
              await getAssignmentList(tutoringId).then((ret) => dispatch(ret));
              setEditMode(false);
            }
          } catch (err) {
            console.log("delete multiple assignments error: ", err);
          }
        },
      },
    ]);
  };

  const goCreateHwScreen = () => {
    navigation.navigate("CreateHwScreen", {
      tutoringId,
    });
  };

  const goSubmitHwScreen = () => {
    navigation.navigate("SubmitHwScreen", {
      assignmentList,
      tutoringId,
    });
  };

  const handleRefresh = async () => {
    await getAssignmentList(tutoringId).then((ret) => dispatch(ret));
  };

  useEffect(() => {
    if (assignmentList) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [assignmentList]);

  return (
    <>
      <MainLayout
        headerText={"숙제 노트"}
        headerLeftType={"back"}
        headerRightType={isTutor ? "pen" : null}
        handlePressHeaderRight={goCreateHwScreen}
        handleRefresh={handleRefresh}
      >
        <NoteHeader
          text={"숙제 목록"}
          type={isTutor ? "delete" : "write"}
          handlePressLeftButton={() => {
            if (assignmentList && assignmentList.length > 0) {
              setEditMode(!editMode);
            }
          }}
          handlePressRightButton={goSubmitHwScreen}
        />

        <Container>
          {loading ? (
            <Loading />
          ) : (
            <HwList
              tutoringId={tutoringId}
              hwList={assignmentList}
              editMode={editMode}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}
        </Container>
      </MainLayout>

      {editMode && (
        <ConfirmButtons
          cancelText="취소"
          confirmText={"삭제"}
          onCancel={() => {
            setEditMode(false);
          }}
          onConfirm={handleDeleteAssignments}
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
