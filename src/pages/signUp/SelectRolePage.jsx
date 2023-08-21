import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import SignUpPageContainer from "../../components/signUp/SignUpPageContainer";

import { RoleType } from "../../screens/root/SignUpScreen";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";

const SelectRolePage = ({ setRole, role }) => {
  const onPress = (type) => {
    setRole(type);
  };

  return (
    <SignUpPageContainer text="1. 가입 유형 선택">
      <Button
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress.bind(this, RoleType.TUTOR)}
        selected={role === RoleType.TUTOR}
      >
        <TextWrapper>
          <RoleText>선생님으로 가입</RoleText>
          <RoleBigText>TUTOR</RoleBigText>
        </TextWrapper>

        <RoleImage source={require("../../assets/images/tutorImage.png")} />
      </Button>

      <Button
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress.bind(this, RoleType.TUTEE)}
        selected={role === RoleType.TUTEE}
      >
        <TextWrapper>
          <RoleText>학생으로 가입</RoleText>
          <RoleBigText>TUTEE</RoleBigText>
        </TextWrapper>
        <RoleImage source={require("../../assets/images/tuteeImage.png")} />
      </Button>
    </SignUpPageContainer>
  );
};

export default SelectRolePage;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: color.COLOR_BOX_SHADOW,
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

const Button = styled.TouchableOpacity`
  background-color: white;
  border-radius: 8;
  width: 100%;
  height: 160;
  margin-bottom: 15;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  border-width: 3;
  border-color: ${({ selected }) =>
    selected ? color.COLOR_MAIN : color.COLOR_GRAY_BORDER};\
`;

const TextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RoleText = styled.Text`
  font-weight: bold;
  font-size: 16;
  padding-vertical: 5;
`;

const RoleBigText = styled.Text`
  font-weight: bold;
  font-size: 22;
  padding-vertical: 5;
`;

const RoleImage = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
