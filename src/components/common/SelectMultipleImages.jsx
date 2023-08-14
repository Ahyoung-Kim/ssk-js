import React from "react";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { TouchableOpacity } from "react-native";

const SelectMultipleImages = ({ children, setImageUrl, handleUploadImage }) => {
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
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      // 이미지 업로드 취소
      return null;
    }

    const { assets } = result;

    const formData = new FormData();

    let images = [];
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];

      const uri = asset.uri;
      const name = uri.split("/").pop();
      const width = asset.width / 5;
      const height = asset.height / 5;

      //   console.log({ uri, name, width, height });

      const manipulatedResult = await ImageManipulator.manipulateAsync(
        uri, //
        [{ resize: { width, height } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      const resizedUri = manipulatedResult.uri;
      formData.append("images", {
        uri: resizedUri,
        name,
        type: "image/jpeg",
      });
    }

    console.log(formData);

    await handleUploadImage(formData);
    // setImageUrl(uri);
  };

  return (
    <>
      <TouchableOpacity onPress={onUploadImage}>{children}</TouchableOpacity>
    </>
  );
};

export default SelectMultipleImages;
