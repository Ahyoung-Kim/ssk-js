import React from "react";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import color from "../../common/color";
import { StatusBar } from "react-native";

const Header = ({
  headerText,
  headerLeftType,
  headerRightType,
  handlePressHeaderLeft = () => {},
  handlePressHeaderRight = () => {},
}) => {
  const navigation = useNavigation(); // 네비게이션

  // 이전 버튼 핸들링
  const handleBackButton = () => {
    navigation.goBack();
  };

  // bell 버튼 핸들링
  const handleBellButton = () => {
    navigation.navigate("TestNotiScreen");
  };

  const makeComponent = (type, onPress) => {
    switch (type) {
      case "back": // 백 버튼
        return (
          <TouchableArea onPress={handleBackButton}>
            <Ionicons name="chevron-back-outline" size={30} color="#fff" />
          </TouchableArea>
        );
      case "prev": // 이전
        return (
          <TouchableArea onPress={handleBackButton}>
            <Ionicons name="caret-back" size={30} color="#fff" />
          </TouchableArea>
        );
      case "next": // 다음
        return (
          <TouchableArea onPress={onPress}>
            <Ionicons name="caret-forward" size={30} color="#fff" />
          </TouchableArea>
        );
      case "setting": // 톱니바퀴
        return (
          <TouchableArea onPress={onPress}>
            <FontAwesome5 name="cog" size={22} color="#fff" />
          </TouchableArea>
        );
      case "bell": // 종 모양(알림)
        return (
          <TouchableArea onPress={handleBellButton}>
            <MaterialCommunityIcons name="bell" size={26} color="#fff" />
          </TouchableArea>
        );
      case "pen": // 펜슬
        return (
          <TouchableArea onPress={onPress}>
            <FontAwesome5 name="pen" size={20} color="#fff" />
          </TouchableArea>
        );
      case "basic":
        return (
          <>
            <UntouchableArea />
          </>
        );
      default:
        return (
          <>
            <UntouchableArea />
          </>
        );
    }
  };

  const leftComponent = makeComponent(headerLeftType, handlePressHeaderLeft);
  const rightComponent = makeComponent(headerRightType, handlePressHeaderRight);

  return (
    <>
      <HeaderWrapper>
        <StatusBar />
        {leftComponent}
        <Text>{headerText}</Text>
        {rightComponent}
      </HeaderWrapper>
    </>
  );
};

export default Header;

// styled
const HeaderWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${color.COLOR_MAIN};
  padding: 15px;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: "ExtraBold";
`;

const TouchableArea = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  activeopacity: 0.8;
  // background-color: orange;
`;

const UntouchableArea = styled.View`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
