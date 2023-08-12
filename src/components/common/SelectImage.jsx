import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import { TouchableOpacity } from "react-native";

const SelectImage = ({ children, setImageUrl, handleUploadImage }) => {
  // 권한 요청
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const onUploadImage = async () => {
    // 권한 확인
    if (!status.granted) {
      const permission = requestPermission();
      if (!(await permission).granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      // 이미지 업로드 취소
      return null;
    }

    // 서버에 요청 보내기
    const uri = result.uri;
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : "image";

    const formData = new FormData();
    formData.append("image", {
      uri,
      name: filename,
      type,
    });

    const headers = {
      "content-type": "multipart/form-data",
    };

    console.log("formData: ", formData);

    setImageUrl(uri);
    handleUploadImage(formData);
  };
  return (
    <>
      <TouchableOpacity onPress={onUploadImage}>{children}</TouchableOpacity>
    </>
  );
};

export default SelectImage;
