import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Alert, TouchableOpacity } from "react-native";

import MainLayout from "../../components/common/MainLayout";
import useUser from "../../hooks/useUser";
import ProfileImage from "../../components/common/ProfileImage";
import TextInputForm from "../../components/inputs/TextInputForm";
import client from "../../config/axios";
import { getData, storeData } from "../../constants/asyncStorage";
import SelectPhotoBSheet from "../../components/common/SelectPhotoBSheet";
import { makeImageFormData } from "../../utils/photo";

const UserInfoScreen = () => {
  const user = useUser();

  const [name, setName] = useState("");
  // 이미지 선택 시 정보
  const [image, setImage] = useState(null);
  // 서버에 저장된 프로필 이미지 url
  const [profileImage, setProfileImage] = useState(null);

  const photoRef = useRef();

  const handleUpdateName = async () => {
    try {
      const ret = await client.put(`/api/user/update`, {
        name,
      });

      if (ret.status == 200) {
        Alert.alert("이름이 변경되었습니다!");
        await storeData("name", name);
      }
    } catch (err) {
      console.log("update user name error: ", err);
    }
  };

  const handleDeleteImage = () => {
    Alert.alert("프로필 사진 변경", "기본 이미지로 변경하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "확인",
        onPress: async () => {
          try {
            const ret = await client.delete("/api/user/profile");

            if (ret.status == 200) {
              console.log("success");
              getProfileImage();
            }
          } catch (err) {
            console.log("delete profile image error: ", err);
          }
        },
      },
    ]);
  };

  const handleUpdateProfileImage = async () => {
    const formData = makeImageFormData("image", image);

    try {
      const ret = await client.post("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-cache",
        },
      });

      if (ret.status == 200) {
        Alert.alert("프로필 사진이 변경되었습니다.");
      }
    } catch (err) {
      console.log("update profile image error: ", err);
    }
  };

  const getProfileImage = async () => {
    try {
      const userId = await getData("id");
      const ret = await client.get(`/api/user/profile/${userId}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (ret.status == 200) {
        setProfileImage(ret.data);
      }
    } catch (err) {
      console.log("get profile image error: ", err);
      const status = err?.response?.status;

      if (status == 404) {
        setProfileImage(null);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      getProfileImage();
    }
  }, [user]);

  useEffect(() => {
    if (image) {
      handleUpdateProfileImage();
    }
  }, [image]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <MainLayout
        bgColor="white"
        headerText={"내 정보"}
        headerLeftType={"back"}
      >
        <ProfileImageContainer>
          <ProfileImage size={120} image={image ? image?.uri : profileImage} />

          <UpdateImageButton
            activeOpacity={0.5}
            onPress={() => photoRef?.current?.open()}
          >
            <UpdateButtonText>프로필 사진 변경</UpdateButtonText>
          </UpdateImageButton>

          <TouchableOpacity activeOpacity={0.5} onPress={handleDeleteImage}>
            <DeleteImageText>기본 이미지로 변경</DeleteImageText>
          </TouchableOpacity>
        </ProfileImageContainer>

        <TextInputForm
          value={name}
          onChangeText={setName}
          label="이름"
          button="변경"
          handleButtonPress={handleUpdateName}
        />

        <TextInputForm label="역할" value={user.role} editable={false} />

        <TextInputForm label="이메일" value={user.userId} editable={false} />
      </MainLayout>

      <SelectPhotoBSheet
        rbRef={photoRef}
        setImages={setImage}
        allowsMultipleSelection={false}
      />
    </>
  );
};

export default UserInfoScreen;

const ProfileImageContainer = styled.View`
  //   background-color: orange;
  justify-content: center;
  align-items: center;
  padding-vertical: 20;
`;

const UpdateImageButton = styled.TouchableOpacity`
  padding-vertical: 5;
  padding-horizontal: 12;
  border-radius: 5;
  border-color: ${color.COLOR_MAIN};
  border-width: 1;
  margin-top: 15;
  margin-bottom: 10;
`;

const UpdateButtonText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-size: 16;
`;

const DeleteImageText = styled.Text`
  color: ${color.COLOR_GRAY_TEXT};
`;
