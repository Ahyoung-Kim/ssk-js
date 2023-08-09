import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";

import ProfileImage from "./ProfileImage";
import { useNavigation } from "@react-navigation/native";
import useIsTutor from "../../hooks/useIsTutor";

const ClassItem = ({ classItem }) => {
  const isTutor = useIsTutor();
  const {
    profileImageUrl,
    subject,
    tutoringId,
    tuteeName,
    tutorName,
    personName,
  } = classItem;

  const navigation = useNavigation();
  const name = personName || tuteeName || tutorName;

  const handlePressClassItem = () => {
    navigation.navigate("ClassInfoScreen", { tutoringId });
  };

  return (
    <Container
      activeOpacity={0.5}
      style={styles.container}
      onPress={handlePressClassItem}
    >
      <UserInfoView>
        <ProfileImage image={profileImageUrl} />

        <UserTextView>
          <UserBigText>{subject}</UserBigText>

          <UserSmallText>
            {name
              ? `${name} ` + (isTutor ? "학생" : "선생님")
              : "학생이 초대되지 않았습니다."}
          </UserSmallText>
        </UserTextView>
      </UserInfoView>

      <FontAwesome5 name="chevron-right" size={20} color={color.COLOR_MAIN} />
    </Container>
  );
};

export default ClassItem;

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

const Container = styled.TouchableOpacity`
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  width: 95%;
  margin-vertical: 4;
  border-radius: 5;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  padding-horizontal: 18;
  padding-vertical: 12;
`;

const UserInfoView = styled.View`
  height: 40;
  flex-direction: row;
  align-items: center;
`;

const UserTextView = styled.View`
  margin-horizontal: 15;
`;

const UserBigText = styled.Text`
  font-weight: bold;
  font-size: 18;
`;

const UserSmallText = styled.Text`
  color: ${color.COLOR_GRAY_TEXT};
  margin-top: 5;
`;
