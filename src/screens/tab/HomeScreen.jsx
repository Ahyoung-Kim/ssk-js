import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import Calendar from "../../components/calendar/Calendar";
import ClassList from "../../components/common/ClassList";
import client from "../../config/axios";

import useClassList from "../../hooks/useClassList";
import Loading from "../../components/common/Loading";

import { useDispatch, useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
import EmptyMessage from "../../components/common/EmptyMessage";
import LeftBarContainer from "../../components/common/LeftBarContainer";
import useClassListInfo from "../../hooks/useClassListInfo";
import useTodayClassList from "../../hooks/useTodayClassList";
import { getClassListInfo } from "../../redux/actions/classListInfoAction";

const HomeScreen = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const dispatch = useDispatch();

  const tutoringList = useClassListInfo(year, month);
  const todayClassList = useTodayClassList();

  const handleRefresh = async () => {
    await getClassListInfo(year, month).then((ret) => dispatch(ret));
  };

  return (
    <>
      <MainLayout headerText={"홈"} handleRefresh={handleRefresh}>
        {tutoringList ? (
          <Calendar
            tutoringList={tutoringList}
            onChangeYearMonth={(_year, _month) => {
              if (_year !== year) {
                setYear(_year);
              }
              if (_month !== month) {
                setMonth(_month);
              }
            }}
          />
        ) : (
          <Loading />
        )}

        <TodayClassView>
          <TodayClassTextWrapper>
            <LeftBarContainer label={"오늘 수업"} />
          </TodayClassTextWrapper>

          {todayClassList && todayClassList.length > 0 ? (
            <ClassList classList={todayClassList} />
          ) : (
            <EmptyMessage
              paddingVertical={15}
              message="예정된 수업이 없습니다."
            />
          )}
        </TodayClassView>
      </MainLayout>
    </>
  );
};

export default HomeScreen;

const TodayClassView = styled.View`
  // background-color: orange;
  margin-vertical: 15;
`;

const TodayClassTextWrapper = styled.View`
  padding-horizontal: 15;
  padding-vertical: 5;
`;

const TodayClassText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_MAIN};
  padding-horizontal: 15;
  padding-vertical: 5;
`;
