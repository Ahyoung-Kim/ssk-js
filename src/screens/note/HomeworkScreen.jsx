import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwFeedItem from "../../components/note/HwFeedItem";

const HomeworkScreen = () => {
  return (
    <>
      <MainLayout
        headerText={"숙제 노트"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader type="settingAndWrite" text={"수학 고쟁이 레벨B"} />

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
