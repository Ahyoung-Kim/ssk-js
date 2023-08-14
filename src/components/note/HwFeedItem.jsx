import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import { dateFormat } from "../../utils/date";

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import FeedCarousel from "../common/FeedCarousel";

import { EvaluationValue } from "../../constants/assignmentEvaluation";
import client from "../../config/axios";

const HwFeedItem = ({ feedItem }) => {
  const { dateTime, id, imageUrl, rate } = feedItem;

  const [evaluation, setEvaluation] = useState(
    rate ? rate : EvaluationValue.NONE
  );

  const handleEvaluation = async (value) => {
    try {
      const ret = await client.post(`/api/assignment/submit/${id}/evaluate`, {
        rate: value,
      });

      if (ret.status == 200) {
        console.log("success");
      }
    } catch (err) {
      console.log("evaluate assignment feed item error: ", err);
    }
  };

  const onPressEvaluation = (value) => {
    handleEvaluation(value).then(() => {
      setEvaluation(value);
    });
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
            <TouchableOpacity
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
            </TouchableOpacity>

            <TouchableOpacity
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
            </TouchableOpacity>

            <TouchableOpacity
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
            </TouchableOpacity>
          </HeaderWrapper>
        </Header>

        <FeedCarousel data={imageUrl} />
      </Container>
    </>
  );
};

export default HwFeedItem;

const Container = styled.View`
  //   background-color: orange;
  padding-bottom: 30;
  //   border-top-width: 1;
  //   border-color: ${color.COLOR_GRAY_BORDER};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 15;
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
