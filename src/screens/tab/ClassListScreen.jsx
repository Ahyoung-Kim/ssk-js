import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import CircleIconButton from "../../components/common/CircleIconButton";
import ClassList from "../../components/common/ClassList";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import ApproveModal from "../../components/modal/ApproveModal";

import useIsTutor from "../../hooks/useIsTutor";
import { useNavigation } from "@react-navigation/native";

import useClassList from "../../hooks/useClassList";
import EmptyMessage from "../../components/common/EmptyMessage";
import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";

const ClassListScreen = () => {
  const classList = useClassList();

  const isTutor = useIsTutor();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // 수업 초대 수락 모달
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handlePressIcon = () => {
    if (isTutor) {
      navigation.navigate("CreateClassScreen");
    } else {
      setModalVisible(true);
    }
  };

  const handleRefresh = async () => {
    await getClassList().then((ret) => dispatch(ret));
  };

  useEffect(() => {
    if (!classList) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [classList]);

  return (
    <>
      <MainLayout headerText={"수업 목록"} handleRefresh={handleRefresh}>
        {loading ? (
          <Loading />
        ) : classList ? (
          <ClassListWrapper>
            {classList.length === 0 ? (
              <EmptyMessage message={"수업 목록이 없습니다."} />
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
