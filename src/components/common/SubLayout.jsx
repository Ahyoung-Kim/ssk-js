import React from "react";
import styled from "styled-components/native";
import color from "../../common/color";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";

const SubLayout = ({ children }) => {
  return (
    <Inner>
      <Contents>{children}</Contents>
    </Inner>
  );
};

export default SubLayout;

const Inner = styled.ScrollView`
  width: 100%;
  flex: 1;
  //background-color: ${color.COLOR_GRAY_BACKGROUND};
  // background-color: yellow;
  flex-direction: column;
  padding-horizontal: 5;
`;

const Contents = styled.View`
  width: 100%;
  flex: 1;
  //background-color: ${color.COLOR_GRAY_BACKGROUND};
  //padding-bottom: 100;
  //background-color: red;
  padding-horizontal: 5;
`;
