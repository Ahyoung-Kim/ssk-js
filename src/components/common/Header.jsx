import React from "react";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

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

  const makeComponent = (type, onPress) => {
    switch (type) {
      case "back":
        return (
          <TouchableArea onPress={handleBackButton}>
            <Ionicons name="chevron-back-outline" size={30} color="#fff" />
          </TouchableArea>
        );
      case "prev":
        return (
          <TouchableArea onPress={handleBackButton}>
            <Ionicons name="caret-back" size={30} color="#fff" />
          </TouchableArea>
        );
      case "next":
        return (
          <TouchableArea onPress={onPress}>
            <Ionicons name="caret-forward" size={30} color="#fff" />
          </TouchableArea>
        );
      case "setting":
        return (
          <TouchableArea onPress={onPress}>
            <FontAwesome5 name="cog" size={30} color="#fff" />
          </TouchableArea>
        );
      case "bell":
        return (
          <TouchableArea onPress={onPress}>
            <FontAwesome5 name="bell" size={30} color="#fff" />
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
  background-color: #0c9bfb;
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
  justify-content: space-between;
  align-items: center;
  activeopacity: 0.8;
`;

const UntouchableArea = styled.View`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
