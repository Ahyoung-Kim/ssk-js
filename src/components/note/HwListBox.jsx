import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FlatList, StyleSheet } from "react-native";
import ClassInfoBoxContainer from "./ClassInfoBoxContainer";
import { useNavigation } from "@react-navigation/native";
import EmptyMessage from "../common/EmptyMessage";
import { proceedingPercentage } from "../../utils/assignment";

const EachHw = ({ proceeding = "70%", assignment }) => {
  const { body, count, goalCount } = assignment;

  return (
    <EachHwContainer>
      <HwName>{body}</HwName>
      <StatusBar>
        <ProceedingBar proceeding={proceedingPercentage(count, goalCount)} />
      </StatusBar>
    </EachHwContainer>
  );
};

const HwListBox = ({ tutoringId, assignmentList }) => {
  const navigation = useNavigation();

  const onPressMoreButton = () => {
    navigation.navigate("HwListScreen", {
      tutoringId,
    });
  };

  if (!assignmentList) {
    return <></>;
  }

  return (
    <>
      <ClassInfoBoxContainer
        name={"숙제 노트"}
        onPressMoreButton={onPressMoreButton}
      >
        {assignmentList.length === 0 ? (
          <EmptyMessage paddingVertical={20} message="숙제 목록이 없습니다!" />
        ) : (
          <FlatList
            keyExtractor={(item, idx) => `hwbox_${item.id}`}
            data={assignmentList}
            renderItem={({ item }) => <EachHw assignment={item} />}
          />
        )}
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
  border-radius: 100px;
  background-color: #dadada;
  overflow: hidden;
`;

const ProceedingBar = styled.View`
  height: 100%;
  width: ${({ proceeding }) => proceeding};
  background-color: ${color.COLOR_MAIN};
`;
