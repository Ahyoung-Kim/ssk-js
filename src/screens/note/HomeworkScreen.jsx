import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwFeedItem from "../../components/note/HwFeedItem";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import client from "../../config/axios";

const HomeworkScreen = () => {
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
          type="settingAndWrite"
          text={assignment.body}
          handlePressLeftButton={goUpdateAssignment}
        />

        {feedInfo && feedInfo.length > 0 && (
          <HwFeed>
            {feedInfo.map((feedItem) => (
              <HwFeedItem key={`feedItem_${feedItem.id}`} feedItem={feedItem} />
            ))}
          </HwFeed>
        )}
      </MainLayout>
    </>
  );
};

export default HomeworkScreen;

const HwFeed = styled.View``;
