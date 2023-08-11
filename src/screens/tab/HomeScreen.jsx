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

import { useSelector } from "react-redux";
import useUser from "../../hooks/useUser";

const HomeScreen = ({ navigation }) => {
  const user = useUser();
  const classList = useClassList();
  const todayClassList = useSelector(
    (state) => state.classListReducer.todayClassList
  );

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [tutoringList, setTutoringList] = useState(null);

  const getTutoringSchedules = async () => {
    try {
      const ret = await client.get(
        `/api/schedule/list/tutorings/${year}/${month}`
      );

      if (ret.status == 200) {
        setTutoringList(ret.data);
      }
    } catch (err) {
      console.log("get tutoring schedules error", err);
      if (err?.response?.status) {
        const status = err?.response?.status;
        if (status == 404) {
          console.log("Tutoring list doesn't exist");
          setTutoringList([]);
        }
      }
    }
  };

  useEffect(() => {
    if (year && month) {
      getTutoringSchedules();
    }
  }, [year, month, classList, user]);

  return (
    <>
      <MainLayout headerText={"홈"} headerType={"basic"}>
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
          <TodayClassText>오늘 수업</TodayClassText>

          <ClassList classList={todayClassList} />
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
const TodayClassText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_MAIN};
  padding-horizontal: 15;
  padding-vertical: 5;
`;
