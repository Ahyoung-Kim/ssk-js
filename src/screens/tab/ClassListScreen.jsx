import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import CircleIconButton from "../../components/common/CircleIconButton";
import ClassList from "../../components/common/ClassList";

import client from "../../config/axios";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyClassList from "../../components/common/EmptyClassList";
import ApproveModal from "../../components/modal/ApproveModal";

import useIsTutor from "../../hooks/useIsTutor";
import { useNavigation } from "@react-navigation/native";
import useClassList from "../../hooks/useClassList";

const ClassListScreen = () => {
  const isTutor = useIsTutor();
  // 학생 => [{ tutoringId, subject, tutorName }]
  // 선생 => [{ tutoringId, subject, tuteeName }]
  // const [classList, setClassList] = useState(null);
  const classList = useClassList();
  const [loading, setLoading] = useState(false);

  // 수업 초대 수락 모달
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  // const getClassList = async () => {
  //   try {
  //     const ret = await client.get("/api/tutoring/list");
  //     // console.log(ret.status);
  //     // console.log(ret.data);
  //     if (ret.status == 200) {
  //       setClassList(ret.data);
  //     }
  //   } catch (err) {
  //     console.log("get class list error: ", err);
  //     if (err.response && err.response.status) {
  //       const status = err.response.status;

  //       if (status == 404) {
  //         console.log("Class list doesn't exist");
  //         setClassList([]);
  //       }
  //     }
  //   }
  // };

  const handlePressIcon = () => {
    if (isTutor) {
      navigation.navigate("CreateClassScreen");
    } else {
      setModalVisible(true);
    }
  };

  // useEffect(() => {
  //   setLoading(true);
  //   getClassList().then(() => setLoading(false));
  // }, []);

  useEffect(() => {
    if (!classList) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [classList]);

  return (
    <>
      <MainLayout headerText={"수업 목록"} headerType={"basic"}>
        {loading ? (
          <Loading />
        ) : classList ? (
          <ClassListWrapper>
            {classList.length === 0 ? (
              <EmptyClassList />
            ) : (
              <ClassList classList={classList} />
            )}
          </ClassListWrapper>
        ) : (
          <ErrorMessage />
        )}
      </MainLayout>

      <CircleIconButton name={"plus"} onPress={handlePressIcon} />

      {/* 학생 수업 참여 모달 */}
      {!isTutor && (
        <>
          <ApproveModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </>
      )}
    </>
  );
};

export default ClassListScreen;

const ClassListWrapper = styled.View`
  margin-vertical: 10;
`;
