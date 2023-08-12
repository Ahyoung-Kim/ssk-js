import React, { useEffect, useRef, useState } from "react";

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

import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";
import HwListBox from "../../components/note/HwListBox";
import ReviewListBox from "../../components/note/ReviewListBox";
import TuteeClassInfoBSheet from "../../components/classInfo/TuteeClassInfoBSheet";

const ClassInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const isTutor = useIsTutor();

  const isFocused = useIsFocused();

  const { tutoringId } = route.params;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [classInfo, setClassInfo] = useState(null);

  const [refetch, setRefetch] = useState(false);

  const rbRef = useRef();

  const handlePressHwBtn = () => {
    navigation.navigate("HwListPage");
  };
  const handlePressReviewBtn = () => {
    navigation.navigate("ReviewListPage");
  };
  const handlePressCircleIcon = () => {
    if (isTutor) {
      navigation.navigate("UpdateClassScreen", {
        classInfo,
      });
    } else {
      rbRef?.current?.open();
    }
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

  useEffect(() => {
    if (refetch) {
      if (year && month && tutoringId) {
        getClassInfo();
        getClassList().then((ret) => dispatch(ret));
      }
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <>
      <MainLayout headerText={"수업 정보"} headerLeftType={"back"}>
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

            {/* <SubLayout>
              <TouchableArea onPress={handlePressHwBtn}>
                <HwNotePreview />
              </TouchableArea>
              <TouchableArea onPress={handlePressReviewBtn}>
                <ReviewNotePreview />
              </TouchableArea>
            </SubLayout> */}
            <ListWrapper>
              <HwListBox />

              <ReviewListBox tutoringId={tutoringId} />
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

const ListWrapper = styled.View`
  margin-top: 20;
  padding-horizontal: 15;
`;
