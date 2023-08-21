import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { TouchableOpacity } from "react-native";

const SelectImage = ({ children, setImageUrl, handleUploadImage }) => {
  // 권한 요청
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const onUploadImage = async () => {
    console.log("click");
    // 권한 확인
    if (!status.granted) {
      const permission = requestPermission();
      if (!(await permission).granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    const name = uri.split("/").pop();
    const width = result.width / 5;
    const height = result.height / 5;

    const manipulatedResult = await ImageManipulator.manipulateAsync(
      uri, //
      [{ resize: { width, height } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );

    const resizedUri = manipulatedResult.uri;
    const formData = new FormData();
    formData.append("image", {
      uri: resizedUri,
      name,
      type: "image/jpeg",
    });

    // console.log(formData);

    await handleUploadImage(formData);
    setImageUrl(uri);
  };
  return (
    <>
      <TouchableOpacity onPress={onUploadImage}>{children}</TouchableOpacity>
    </>
  );
};

export default SelectImage;
