import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwFeedItem from "../../components/note/HwFeedItem";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import client from "../../config/axios";

import { FlatList } from "react-native";
import EmptyMessage from "../../components/common/EmptyMessage";
import useIsTutor from "../../hooks/useIsTutor";

const HomeworkScreen = () => {
  const isTutor = useIsTutor();
  const navigation = useNavigation();
  const route = useRoute();
  const { assignment } = route.params;

  const [feedInfo, setFeedInfo] = useState(null);

  // console.log(assignment);

  const goUpdateAssignment = () => {
    navigation.navigate("CreateHwScreen", {
      prevAssignment: assignment,
    });
  };

  const goSubmitHwScreen = () => {
    navigation.navigate("SubmitHwScreen", {
      assignment,
    });
  };

  const getAssignmentSubmits = async () => {
    try {
      const ret = await client.get(
        `/api/assignment/${assignment.id}/submit/list`
      );

      if (ret.status == 200) {
        // console.log(ret.data);

        setFeedInfo(ret.data);
      }
    } catch (err) {
      console.log("get assignment submits error: ", err);
    }
  };

  useEffect(() => {
    getAssignmentSubmits();
  }, [assignment]);

  return (
    <>
      <MainLayout
        headerText={"숙제 노트"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader
          type={isTutor ? "setting" : "write"}
          text={assignment.body}
          handlePressLeftButton={goUpdateAssignment}
          handlePressRightButton={goSubmitHwScreen}
        />

        {feedInfo && feedInfo.length > 0 ? (
          <FlatList
            numColumns={1}
            data={feedInfo}
            inverted={true}
            keyExtractor={(item) => `feedItem_${item.id}`}
            renderItem={({ item }) => <HwFeedItem feedItem={item} />}
          />
        ) : (
          <EmptyMessage message="인증된 숙제가 없습니다." />
        )}
      </MainLayout>
    </>
  );
};

export default HomeworkScreen;
