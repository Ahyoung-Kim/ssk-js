import React from "react";
import MainLayout from "../../components/common/MainLayout";
import styled from "styled-components/native";
import ProgressBar from "../../components/homeworkNote/ProgressBar";
import color from "../../common/color";
import { Ionicons } from "@expo/vector-icons";
import SubLayout from "../../components/common/SubLayout";
import { useNavigation } from "@react-navigation/native";
const HwListPage = () => {
  const navigation = useNavigation();

  const moveToHwFeed = () => {
    navigation.navigate("HwFeedPage");
  };
  return (
    <>
      <MainLayout headerText={"숙제 노트"} headerLeftType={"back"}>
        <TopWrapper>
          <Ionicons name="create-outline" size={32} color="#B0B0B0" />
          <BoldText>숙제 목록</BoldText>
          <Ionicons name="add-circle-outline" size={32} color="#B0B0B0" />
        </TopWrapper>
        <TouchableArea onPress={moveToHwFeed}>
          <Container>
            <TextView>
              <ContentText>수학 고쟁이 레벨B 15문제</ContentText>
              <DueText>1월 8일~ 1월 14일</DueText>
            </TextView>
            <SubmitText>매주 월, 수, 금 제출</SubmitText>
          </Container>
        </TouchableArea>
      </MainLayout>
    </>
  );
};
export default HwListPage;

const TouchableArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  activeopacity: 0.8;
`;

const TopWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 20;
  margin-horizontal: 20;
`;

const BoldText = styled.Text`
  font-size: 24;
  font-weight: bold;
  color: ${color.COLOR_MAIN};
`;

const Container = styled.View`
  border-radius: 8px;
  border: 1px solid ${color.COLOR_MAIN};
  background: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  alignitems: center;
  height: 100;
  padding-horizontal: 20;
  margin-vertical: 10;
  margin-horizontal: 15;
`;

const ContentText = styled.Text`
  font-size: 15;
  font-weight: bold;
`;

const DueText = styled.Text`
  font-size: 15;
`;

const TextView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 15;
`;
const SubmitText = styled.Text``;
