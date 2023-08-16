import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Platform, StyleSheet } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import BottomSheet from "./BottomSheet";

const SelectPhotoBSheet = ({ rbRef, setImages }) => {
  // 카메라 권한 요청
  const [cameraStatus, cameraRequestPermission] =
    ImagePicker.useCameraPermissions();
  // 갤러리 권한 요청
  const [libraryStatus, libraryRequestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const setImageSources = async (result) => {
    if (result.canceled) {
      return;
    }

    const { assets } = result;
    let images = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];

      const uri = asset.uri;
      const name = uri.split("/").pop();
      const width = asset.width / 5;
      const height = asset.height / 5;

      const _result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width, height } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      const resizedUri = _result.uri;
      const image = {
        uri: resizedUri,
        name,
        type: "image/jpeg",
      };
      images.push(image);
    }

    setImages((prev) => [...prev, ...images]);
    rbRef?.current?.close();
  };

  const onPressCamera = async () => {
    if (!cameraStatus.granted) {
      const permission = cameraRequestPermission();
      if (!(await permission).granted) {
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    await setImageSources(result);
  };

  const onPressLibrary = async () => {
    if (!libraryStatus.granted) {
      const permission = libraryRequestPermission();
      if (!(await permission).granted) {
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    await setImageSources(result);
  };

  return (
    <>
      <BottomSheet rbRef={rbRef} height={330}>
        <Button style={styles.button} onPress={onPressCamera}>
          <FontAwesome5 size={30} name="camera" color={color.COLOR_MAIN} />
          <ButtonText>사진 촬영</ButtonText>
        </Button>

        <Button style={styles.button} onPress={onPressLibrary}>
          <FontAwesome size={30} name="photo" color={color.COLOR_MAIN} />
          <ButtonText>갤러리 사진 선택</ButtonText>
        </Button>
      </BottomSheet>
    </>
  );
};

export default SelectPhotoBSheet;

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        shadowColor: color.COLOR_BOX_SHADOW,
        shadowOffset: {
          width: 3,
          height: 3,
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

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  height: 100;
  padding-horizontal: 25;
  margin-bottom: 15;
  border-radius: 8;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 20;
  margin-left: 15;
  color: ${color.COLOR_MAIN};
`;
