import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwFeedItem from "../../components/note/HwFeedItem";
import { useNavigation, useRoute } from "@react-navigation/core";

import { FlatList } from "react-native";
import EmptyMessage from "../../components/common/EmptyMessage";
import useIsTutor from "../../hooks/useIsTutor";
import useFeedInfo from "../../hooks/useFeedInfo";
import { useDispatch } from "react-redux";
import { getFeedInfo } from "../../redux/actions/feedInfoAction";

const HomeworkScreen = () => {
  const isTutor = useIsTutor();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { assignment, tutoringId } = route.params;

  const feedInfo = useFeedInfo(assignment.id);

  const goUpdateAssignment = () => {
    navigation.navigate("CreateHwScreen", {
      prevAssignment: assignment,
      tutoringId,
    });
  };

  const goSubmitHwScreen = () => {
    navigation.navigate("SubmitHwScreen", {
      assignment,
    });
  };

  const handleRefresh = async () => {
    await getFeedInfo(assignment.id).then((ret) => dispatch(ret));
  };

  return (
    <>
      <MainLayout
        headerText={"숙제 노트"}
        headerLeftType={"back"}
        bgColor="white"
        handleRefresh={handleRefresh}
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
            renderItem={({ item }) => (
              <HwFeedItem
                feedItem={item}
                tutoringId={tutoringId}
                assignmentId={assignment.id}
                noteId={assignment.noteId}
              />
            )}
          />
        ) : (
          <EmptyMessage message="인증된 숙제가 없습니다." />
        )}
      </MainLayout>
    </>
  );
};

export default HomeworkScreen;
