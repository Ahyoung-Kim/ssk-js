import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FlatList, StyleSheet } from "react-native";
import ClassInfoBoxContainer from "./ClassInfoBoxContainer";
import { useNavigation } from "@react-navigation/native";

const EachHw = ({ proceeding = "70%" }) => {
  return (
    <EachHwContainer>
      <HwName>숙제 내용이 들어갈 부분</HwName>
      <StatusBar>
        <ProceedingBar proceeding={proceeding} />
      </StatusBar>
    </EachHwContainer>
  );
};

const HwListBox = () => {
  const navigation = useNavigation();

  const onPressMoreButton = () => {
    navigation.navigate("HwListPage");
  };

  return (
    <>
      <ClassInfoBoxContainer
        name={"숙제 노트"}
        onPressMoreButton={onPressMoreButton}
      >
        <FlatList
          keyExtractor={(item, idx) => `hwbox_${idx}`}
          data={[1, 2]}
          renderItem={({ item }) => <EachHw data={item} />}
        />
      </ClassInfoBoxContainer>
    </>
  );
};

export default HwListBox;

const Container = styled.TouchableOpacity``;

const EachHwContainer = styled.View`
  //   background-color: orange;
  margin-vertical: 5;
`;

const HwName = styled.Text`
  font-weight: bold;
  color: ${color.COLOR_GRAY_TEXT};
  margin-bottom: 7;
`;

const StatusBar = styled.View`
  width: 100%;
  height: 25;
  border-radius: 50%;
  background-color: #dadada;
  overflow: hidden;
`;

const ProceedingBar = styled.View`
  height: 100%;
  width: ${({ proceeding }) => proceeding};
  background-color: ${color.COLOR_MAIN};
`;
