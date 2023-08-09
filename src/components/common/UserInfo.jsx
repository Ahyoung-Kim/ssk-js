import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ProfileImage from "./ProfileImage";
import useIsTutor from "../../hooks/useIsTutor";

const UserInfo = ({
  profileImageUrl,
  subject = "과목",
  name = "학생/선생 이름",
}) => {
  const isTutor = useIsTutor();

  return (
    <>
      <UserInfoView>
        {name && (
          <ProfileImageView>
            <ProfileImage image={profileImageUrl} />
          </ProfileImageView>
        )}

        <TextView>
          <InfoBigText>{subject}</InfoBigText>
          <InfoSmallText>
            {name
              ? name + " " + (isTutor ? "학생" : "선생님")
              : "학생이 초대되지 않았습니다."}
          </InfoSmallText>
        </TextView>
      </UserInfoView>
    </>
  );
};

export default UserInfo;

const UserInfoView = styled.View`
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
`;

const ProfileImageView = styled.View`
  margin-right: 10;
`;

const TextView = styled.View``;

const InfoBigText = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-bottom: 3;
`;

const InfoSmallText = styled.Text`
  font-weight: 500;
  color: ${color.COLOR_GRAY_TEXT};
  font-size: 12;
`;
