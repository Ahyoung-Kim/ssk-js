import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { dw } from "../../common/windowSize";
import Carousel from "../common/Carousel";

import { EvaluationType } from "../../constants/assignmentEvaluation";

const HwFeedItem = () => {
  const [evaluation, setEvaluation] = useState(EvaluationType.NONE);

  const onPressEvaluation = (type) => {
    setEvaluation(type);
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderWrapper>
            <DateText>2023년 8월 27일</DateText>
          </HeaderWrapper>

          <HeaderWrapper>
            <TouchableOpacity
              onPress={onPressEvaluation.bind(this, EvaluationType.CRICLE)}
            >
              <MaterialCommunityIcons
                size={20}
                name="checkbox-blank-circle-outline"
                color={
                  evaluation === EvaluationType.CRICLE
                    ? color.COLOR_EVALUATION_CIRCLE
                    : color.COLOR_GRAY_ICON
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressEvaluation.bind(this, EvaluationType.TRIANGLE)}
            >
              <MaterialCommunityIcons
                size={20}
                name="triangle-outline"
                color={
                  evaluation === EvaluationType.TRIANGLE
                    ? color.COLOR_EVALUATION_TRIANGLE
                    : color.COLOR_GRAY_ICON
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressEvaluation.bind(this, EvaluationType.X)}
            >
              <Feather
                size={24}
                name="x"
                color={
                  evaluation === EvaluationType.X
                    ? color.COLOR_EVALUATION_X
                    : color.COLOR_GRAY_ICON
                }
              />
            </TouchableOpacity>
          </HeaderWrapper>
        </Header>

        <Carousel
          data={[0, 1, 2]}
          renderItem={
            <HwImage source={require("../../assets/images/examImage.jpeg")} />
          }
        />
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

const HwImage = styled.Image`
  width: ${dw};
  height: ${dw};
  resize-mode: contain;
  overflow: hidden;
`;
