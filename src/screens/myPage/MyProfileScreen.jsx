import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import color from "../../common/color";
import { getData } from "../../constants/asyncStorage";

import MainLayout from "../../components/common/MainLayout";
import ProfileImage from "../../components/common/ProfileImage";
import ProfileInfo from "../../components/myPage/ProfileInfo";
import ImageUpdateButton from "../../components/myPage/ImageUpdateButton";
import ConfirmModal from "../../components/common/ConfirmModal";
import useUser from "../../hooks/useUser";

const MyProfileScreen = () => {
  const user = useUser();

  const [isOpened, setIsOpened] = useState(false);

  const [image, setImage] = useState(null);

  const [nickName, setNickName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [newName, setNewName] = useState("");

  const updateNickName = async () => {
    try {
      const token = await getData("accessToken");
      const data = { name: newName };
      console.log("보내기 전: ", data);
      const response = await axios.put(
        "http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/api/user/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = await getData("accessToken");
      const response = await axios.get(
        "http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/api/user/detail",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await fetchUserInfo();
      console.log(userInfo);
      setNickName(userInfo.name);
      setRole(userInfo.role);
    };

    fetchData();
  }, [isOpened]);

  useEffect(() => {
    if (user) {
      setNickName(user.name);
      setEmail(user.userId);
      setRole(user.role);
    }
  }, [user]);

  return (
    <>
      <MainLayout
        bgColor={color.COLOR_WHITE_BACKGROUND}
        headerText={"내 정보"}
        headerLeftType={"back"}
      >
        <ProfileImageWrapper>
          <ProfileImage size={120} image={image} />

          <ImageUpdateButton setImage={setImage} />

          <DefaultImageButton>
            <DefaultImageText>기본 이미지로 변경</DefaultImageText>
          </DefaultImageButton>
        </ProfileImageWrapper>

        <ContentWrapper>
          <ProfileInfo
            headerText="이름"
            contentText={nickName}
            setIsOpened={setIsOpened}
          />
          <ProfileInfo headerText="Tutor/Tutee" contentText={role} />
          <ProfileInfo headerText="이메일" contentText={email} />
        </ContentWrapper>

        {isOpened && (
          <ConfirmModal
            modalText="변경할 이름을 입력해주세요."
            confirmText="변경하기"
            cancelText="취소하기"
            onCancel={() => setIsOpened(false)}
            onConfirm={updateNickName}
            newValue={newName}
            setNewValue={setNewName}
          />
        )}
      </MainLayout>
    </>
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
