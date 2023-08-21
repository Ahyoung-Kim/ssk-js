import React, { useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import { dateFormat } from "../../utils/date";

import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { TouchableOpacity, Pressable } from "react-native";

import FeedCarousel from "../common/FeedCarousel";

import { EvaluationValue } from "../../constants/assignmentEvaluation";
import client from "../../config/axios";
import useIsTutor from "../../hooks/useIsTutor";
import DeleteFeedItemBSheet from "./DeleteFeedItemBSheet";
import { useDispatch } from "react-redux";
import { getFeedInfo } from "../../redux/actions/feedInfoAction";
import { getAssignmentList } from "../../redux/actions/assignmentListAction";
import { getClassNote } from "../../redux/actions/classNoteAction";
import { clearClassInfo } from "../../redux/actions/classInfoAction";

const HwFeedItem = ({ feedItem, tutoringId, assignmentId, noteId }) => {
  const isTutor = useIsTutor();
  const dispatch = useDispatch();
  const { dateTime, id, imageUrl, rate } = feedItem;

  const rbRef = useRef();

  const [evaluation, setEvaluation] = useState(
    rate ? rate : EvaluationValue.NONE
  );

  const refetchData = async () => {
    await getFeedInfo(assignmentId).then((ret) => dispatch(ret));
    await getAssignmentList(tutoringId).then((ret) => dispatch(ret));
    await getClassNote(noteId).then((ret) => dispatch(ret));
    dispatch(clearClassInfo());
  };

  const handleEvaluation = async (value) => {
    try {
      const ret = await client.post(`/api/assignment/submit/${id}/evaluate`, {
        rate: value,
      });

      if (ret.status == 200) {
        console.log("success");
        await getFeedInfo(assignmentId).then((ret) => dispatch(ret));
      }
    } catch (err) {
      console.log("evaluate assignment feed item error: ", err);
    }
  };

  const onPressEvaluation = (value) => {
    if (isTutor) {
      handleEvaluation(value).then(() => {
        setEvaluation(value);
      });
    }
  };

  if (!feedItem) {
    return <></>;
  }

  return (
    <>
      <Container>
        <Header>
          <HeaderWrapper>
            <DateText>{dateFormat(dateTime)}</DateText>
          </HeaderWrapper>

          <HeaderWrapper>
            <Pressable
              onPress={onPressEvaluation.bind(this, EvaluationValue.CRICLE)}
            >
              <MaterialCommunityIcons
                size={20}
                name="checkbox-blank-circle-outline"
                color={
                  evaluation === EvaluationValue.CRICLE
                    ? color.COLOR_EVALUATION_CIRCLE
                    : color.COLOR_GRAY_ICON
                }
              />
            </Pressable>

            <Pressable
              onPress={onPressEvaluation.bind(this, EvaluationValue.TRIANGLE)}
            >
              <MaterialCommunityIcons
                size={20}
                name="triangle-outline"
                color={
                  evaluation === EvaluationValue.TRIANGLE
                    ? color.COLOR_EVALUATION_TRIANGLE
                    : color.COLOR_GRAY_ICON
                }
              />
            </Pressable>

            <Pressable
              onPress={onPressEvaluation.bind(this, EvaluationValue.X)}
            >
              <Feather
                size={24}
                name="x"
                color={
                  evaluation === EvaluationValue.X
                    ? color.COLOR_EVALUATION_X
                    : color.COLOR_GRAY_ICON
                }
              />
            </Pressable>
          </HeaderWrapper>
        </Header>

        <FeedCarousel data={imageUrl} />

        {!isTutor && (
          <TouchableOpacity onPress={() => rbRef?.current?.open()}>
            <Text>편집하기</Text>
          </TouchableOpacity>
        )}
      </Container>

      <DeleteFeedItemBSheet
        rbRef={rbRef}
        submitId={id}
        refetchData={refetchData}
      />
    </>
  );
};

export default HwFeedItem;

const Container = styled.View`
  // background-color: orange;
  padding-bottom: 30;
  border-bottom-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 10;
  padding-vertical: 7;
`;

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_MAIN};
`;

const Text = styled.Text`
  // background-color: orange;
  padding-horizontal: 10;
  padding-vertical: 10;
  color: ${color.COLOR_GRAY_TEXT};
  font-weight: bold;
  align-self: flex-end;
`;
