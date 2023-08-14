import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwFeedItem from "../../components/note/HwFeedItem";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";

const HomeworkScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { assignment } = route.params;

  // console.log(assignment);

  const goUpdateAssignment = () => {
    navigation.navigate("CreateHwScreen", {
      prevAssignment: assignment,
    });
  };

  return (
    <>
      <MainLayout
        headerText={"숙제 노트"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader
          type="settingAndWrite"
          text={assignment.body}
          handlePressLeftButton={goUpdateAssignment}
        />

        <HwFeed>
          <HwFeedItem />
          <HwFeedItem />
          <HwFeedItem />
        </HwFeed>
      </MainLayout>
    </>
  );
};

export default HomeworkScreen;

const HwFeed = styled.View``;
