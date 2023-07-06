import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import color from "../../common/color";
import { getData } from "../../constants/asyncStorage";

import WhiteLayout from "../../components/common/WhiteLayout";
import ProfileImage from "../../components/common/ProfileImage";
import ProfileInfo from "../../components/myPage/ProfileInfo";
import ImageUpdateButton from "../../components/myPage/ImageUpdateButton";

const MyProfileScreen = () => {
  const [ image, setImage ] = useState(null);
  const [ nickName, setNickName ] = useState("");
  const [ role, setRole ] = useState("");
  const [ email, setEmail ] = useState("eagle625@naver.com");

  const fetchUserInfo = async () => {
    try {
      const token = await getData("access-token");
      const response = await axios.get("http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/api/user/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    };
  };

  useEffect(() => {
    const fetchData = async() => {
      const userInfo = await fetchUserInfo();
      console.log(userInfo);
      setNickName(userInfo.name);
      setRole(userInfo.role);
    };

    fetchData();
  }, []);

  return (
    <WhiteLayout headerText={"내 정보"} headerType={"back"}>
      <ProfileImageWrapper>
        <ProfileImage size={120} image={image} />
        <ImageUpdateButton setImage={setImage}/>
        <DefaultImageButton>
          <DefaultImageText>기본 이미지로 변경</DefaultImageText>
        </DefaultImageButton>
      </ProfileImageWrapper>
      <ContentWrapper>
        <ProfileInfo headerText="이름" contentText={nickName}/>
        <ProfileInfo headerText="Tutor/Tutee" contentText={role}/>
        <ProfileInfo headerText="이메일" contentText={email}/>
      </ContentWrapper>
    </WhiteLayout>
  );
};

export default MyProfileScreen;

// styled
const ProfileImageWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  gap: 7px;
`;

const ContentWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const DefaultImageButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DefaultImageText = styled.Text`
  color: ${color.COLOR_GRAY_BUTTON};
  font-size: 12px;
  font-family: "Regular";
`;