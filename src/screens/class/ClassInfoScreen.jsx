import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components/native";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import MainLayout from "../../components/common/MainLayout";
import Calendar from "../../components/calendar/Calendar";
import Loading from "../../components/common/Loading";
import ClassDetailInfo from "../../components/classInfo/ClassDetailInfo";
import useIsTutor from "../../hooks/useIsTutor";
import CircleIconButton from "../../components/common/CircleIconButton";

import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";
import { getClassInfo } from "../../redux/actions/classInfoAction";
import HwListBox from "../../components/note/HwListBox";
import ReviewListBox from "../../components/note/ReviewListBox";
import TuteeClassInfoBSheet from "../../components/classInfo/TuteeClassInfoBSheet";
import useClassInfo from "../../hooks/useClassInfo";
import {
  clearClassListInfo,
  getClassListInfo,
} from "../../redux/actions/classListInfoAction";

const ClassInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const isTutor = useIsTutor();

  const { tutoringId } = route.params;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [refetch, setRefetch] = useState(false);

  const classInfo = useClassInfo(tutoringId, year, month);

  const rbRef = useRef();

  const handlePressCircleIcon = () => {
    if (isTutor) {
      navigation.navigate("UpdateClassScreen", {
        classInfo,
      });
    } else {
      rbRef?.current?.open();
    }
  };

  const refetchData = async () => {
    getClassInfo(tutoringId, year, month).then((ret) => dispatch(ret));
    dispatch(clearClassListInfo());
  };

  useEffect(() => {
    if (refetch) {
      refetchData();
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <>
      <MainLayout
        headerText={"수업 정보"}
        headerLeftType={"back"}
        handleRefresh={refetchData}
      >
        {!classInfo ? (
          <Loading />
        ) : (
          <>
            <ClassDetailInfo classInfo={classInfo} />

            <Calendar
              classInfo={classInfo}
              onChangeYearMonth={(_year, _month) => {
                if (_year !== year) {
                  setYear(_year);
                }

                if (_month !== month) {
                  setMonth(_month);
                }
              }}
            />

            <ListWrapper>
              <HwListBox
                assignmentList={classInfo && classInfo.assignmentList}
                tutoringId={tutoringId}
              />

              <ReviewListBox
                reviewList={classInfo && classInfo.reviewList}
                tutoringId={tutoringId}
              />
            </ListWrapper>
          </>
        )}
      </MainLayout>

      <CircleIconButton name="cog" onPress={handlePressCircleIcon} size={18} />

      {!isTutor && classInfo && (
        <TuteeClassInfoBSheet
          rbRef={rbRef}
          classInfo={classInfo}
          setRefetch={setRefetch}
        />
      )}
    </>
  );
};

export default ClassInfoScreen;

const ListWrapper = styled.View`
  margin-top: 20;
  padding-horizontal: 15;
`;
