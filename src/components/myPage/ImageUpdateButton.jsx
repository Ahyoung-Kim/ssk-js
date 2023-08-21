import React, { useEffect } from "react";
import styled from "styled-components/native";

import color from "../../common/color";
import { pickImage } from "../../constants/imagePicker";
import SelectImage from "../common/SelectImage";
import client from "../../config/axios";
import { Alert } from "react-native";

const ImageUpdateButton = ({ setImage }) => {
  const handleUploadImage = async (formData) => {
    try {
      const ret = await client.post("/api/user/profile", formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (ret.status == 200) {
        Alert.alert("프로필 이미지가 변경되었습니다.");
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <SelectImage setImageUrl={setImage} handleUploadImage={handleUploadImage}>
        <Button>
          <ButtonText>프로필 사진 수정</ButtonText>
        </Button>
      </SelectImage>
    </>
  );
};

export default ImageUpdateButton;

// styled
const Button = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  border: 1px solid ${color.COLOR_MAIN};
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-size: 14px;
  font-family: "Regular";
`;
