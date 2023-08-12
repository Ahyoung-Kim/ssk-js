import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Header = ({ text, type }) => {
  const navigation = useNavigation(); // 네비게이션

  // 이전 버튼 핸들링
  const handleBackButton = () => {
    navigation.goBack();
  };

  // 유형 별 헤더
  let component;
  switch (type) {
    case "basic": // 제목만
      component = (
        <>
          <UntouchableArea />
          <Text>{text}</Text>
          <UntouchableArea />
        </>
      );
      break;
    case "back": // 뒤로가기 버튼
      component = (
        <>
          <TouchableArea onPress={handleBackButton}>
            <Ionicons name="chevron-back-outline" size={30} color="#fff" />
          </TouchableArea>
          <Text>{text}</Text>
          <UntouchableArea />
        </>
      );
      break;
    case "nextBack": // 이전, 다음 버튼
      component = (
        <>
          <TouchableArea onPress={handleBackButton}>
            <Ionicons name="caret-back" size={30} color="#fff" />
          </TouchableArea>
          <Text>{text}</Text>
          <TouchableArea>
            <Ionicons name="caret-forward" size={30} color="#fff" />
          </TouchableArea>
        </>
      );
      break;
    default:
      component = (
        <>
          <UntouchableArea />
          <Text>{text}</Text>
          <UntouchableArea />
        </>
      );
      break;
  }

  return <HeaderWrapper>{component}</HeaderWrapper>;
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
