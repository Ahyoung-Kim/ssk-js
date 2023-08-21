import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";

import ProfileImage from "./ProfileImage";

const StudentItem = () => {
  return (
    <Container style={styles.container}>
      <UserInfoView>
        <ProfileImage />

        <UserTextView>
          <BigText>김학생</BigText>
          <SmallText>서강중학교</SmallText>
        </UserTextView>
      </UserInfoView>

      <FontAwesome5 name="chevron-right" size={20} color={color.COLOR_MAIN} />
    </Container>
  );
};

export default StudentItem;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: color.COLOR_BOX_SHADOW,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

const Container = styled.View`
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  width: 95%;
  margin-vertical: 4;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  padding-horizontal: 18;
  padding-vertical: 10;
`;

const UserInfoView = styled.View`
  height: 40;
  flex-direction: row;
  align-items: center;
`;

const UserTextView = styled.View`
  margin-horizontal: 15;
`;

const BigText = styled.Text`
  font-weight: bold;
  font-size: 18;
`;

const SmallText = styled.Text`
  color: ${color.COLOR_GRAY_TEXT};
  margin-top: 3;
`;
