import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ProfileImage from "../common/ProfileImage";

const ClassUserInfo = ({ profileImageUrl, role, name }) => {
  const roleText =
    role == "TUTOR" ? "선생님" : role === "TUTEE" ? "학생" : "undefined";

  return (
    <>
      <UserInfoView>
        <ProfileImage size={40} image={profileImageUrl} />

        <TextView>
          <InfoBigText numberOfLines={1} ellipsizeMode="tail">
            {name}
          </InfoBigText>
          <InfoSmallText>{roleText}</InfoSmallText>
        </TextView>
      </UserInfoView>
    </>
  );
};

export default ClassUserInfo;

const UserInfoView = styled.View`
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
`;

const TextView = styled.View`
  margin-left: 10;
  flex-shrink: 1;
`;

const InfoBigText = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-bottom: 5;
`;

const InfoSmallText = styled.Text`
  font-weight: 500;
  color: ${color.COLOR_GRAY_TEXT};
  font-size: 12;
`;
