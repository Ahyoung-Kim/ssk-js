import React from "react";

import MainLayout from "../../components/common/MainLayout";
import styled from "styled-components/native";

import ProgressBar from "../../components/homeworkNote/ProgressBar";
import color from "../../common/color";
import { Ionicons } from "@expo/vector-icons";
import SubLayout from "../../components/common/SubLayout";
import { useNavigation } from "@react-navigation/native";

const HwFeedPage = () => {
  return (
    <>
      <MainLayout headerText={"숙제 노트"} headerLeftType={"back"}>
        <ContentText>피드페이지</ContentText>
      </MainLayout>
    </>
  );
};
export default HwFeedPage;

const ContentText = styled.Text`
  font-size: 15;
  font-weight: bold;
`;
