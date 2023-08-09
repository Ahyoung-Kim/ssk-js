import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import MainLayout from "../../components/common/MainLayout";
import Calendar from "../../components/calendar/Calendar";
import HwNotePreview from "../../components/homeworkNote/HwNotePreview";
import ReviewNotePreview from "../../components/reviewNote/ReviewNotePreview";
import StudentInfo from "../../components/classInfo/StudentInfo";
import TeacherInfo from "../../components/classInfo/TeacherInfo";
import SubLayout from "../../components/common/SubLayout";
import ClassInfo from "../../components/classInfo/ClassInfo";
import client from "../../config/axios";
import Loading from "../../components/common/Loading";
import ClassDetailInfo from "../../components/classInfo/ClassDetailInfo";
import useIsTutor from "../../hooks/useIsTutor";
import CircleIconButton from "../../components/common/CircleIconButton";

const ClassInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isTutor = useIsTutor();

  const isFocused = useIsFocused();

  const { tutoringId } = route.params;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [classInfo, setClassInfo] = useState(null);

  const handlePressHwBtn = () => {
    navigation.navigate("HwListPage");
  };
  const handlePressReviewBtn = () => {
    navigation.navigate("ReviewListPage");
  };
  const handlePressCircleIcon = () => {
    navigation.navigate("UpdateClassScreen", {
      classInfo,
    });
  };

  const getClassInfo = async () => {
    try {
      const ret = await client.get(
        `/api/tutoring/detail/${tutoringId}/${year}/${month}`
      );

      if (ret.status == 200) {
        // console.log("class info: ", ret.data);
        setClassInfo(ret.data);
      }
    } catch (err) {
      console.log("get class detail info error: ", err);
    }
  };

  useEffect(() => {
    if (year && month && tutoringId) {
      getClassInfo();
    }
  }, [year, month, tutoringId]);

  useEffect(() => {
    if (isFocused && route.params.refetch) {
      if (year && month && tutoringId) {
        getClassInfo();
      }
    }
  }, [isFocused]);

  return (
    <>
      <MainLayout headerText={"수업 정보"} headerType={"back"}>
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

            <SubLayout>
              <TouchableArea onPress={handlePressHwBtn}>
                <HwNotePreview />
              </TouchableArea>
              <TouchableArea onPress={handlePressReviewBtn}>
                <ReviewNotePreview />
              </TouchableArea>
            </SubLayout>
          </>
        )}
      </MainLayout>

      {isTutor && (
        <CircleIconButton
          name="cog"
          onPress={handlePressCircleIcon}
          size={18}
        />
      )}
    </>
  );
};

export default ClassInfoScreen;

const TouchableArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  activeopacity: 0.8;
`;
const Wrapper = styled.View`
  margin-vertical: 15;
  padding-horizontal: 20;
`;

const InfroWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 25;
`;
