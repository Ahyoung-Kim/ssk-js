import React, { useEffect, useRef, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import styled from "styled-components/native";
import color from "../../common/color";
import { dw } from "../../common/windowSize";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import DropDownForm from "../../components/inputs/DropDownForm";
import SelectPhotoBSheet from "../../components/common/SelectPhotoBSheet";
import InputLabel from "../../components/inputs/InputLabel";

import client from "../../config/axios";
import { makeImageFormData } from "../../utils/photo";
import { Alert } from "react-native";
import BigButton from "../../components/common/BigButton";

const SubmitHwScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { assignment, assignmentList } = route.params;

  const [images, setImages] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const photoRbRef = useRef();

  const onPressXButton = (image) => {
    setImages(images.filter((_image) => _image !== image));
  };

  const handleSubmitAssignment = async () => {
    const assignmentId = assignment
      ? assignment?.id
      : selectedAssignment
      ? selectedAssignment?.id
      : null;

    if (!assignmentId) {
      Alert.alert("제출할 숙제를 선택해주세요!");
      return;
    }

    if (images.length == 0) {
      Alert.alert("숙제 인증 사진을 선택해주세요!");
      return;
    }

    const formData = makeImageFormData("images", images);

    try {
      const ret = await client.post(
        `/api/assignment/${assignmentId}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (ret.status == 200) {
        const param = assignment ? assignment : selectedAssignment;

        Alert.alert("숙제 인증 사진이 등록되었습니다.");
        setTimeout(() => {
          navigation.navigate("HomeworkScreen", {
            assignment: param,
          });
        }, 500);
      }
    } catch (err) {
      console.log("submit assignment error: ", err);
    }
  };

  return (
    <>
      <MainLayout
        bgColor="white"
        headerText={"숙제 노트"}
        headerLeftType={"back"}
      >
        <NoteHeader
          text={assignment ? `[${assignment.body}] 숙제 인증` : "숙제 인증"}
        />

        {!assignment && assignmentList && (
          <DropDownForm
            label={"제출할 숙제"}
            list={assignmentList}
            textKey={"body"}
            placeholder={"제출할 숙제를 선택하세요"}
            onPressItem={(item) => {
              // console.log(item);
              setSelectedAssignment(item);
            }}
          />
        )}

        <Container>
          <InputLabel label="숙제 인증 사진" />

          <ImageContainer>
            {images.length > 0
              ? images.map((image) => (
                  <ImageWrapper key={image.uri}>
                    <Image source={{ uri: image.uri }} />

                    <XButton onPress={onPressXButton.bind(this, image)}>
                      <MaterialIcons
                        name="cancel"
                        color={color.COLOR_RED_TEXT}
                        size={18}
                      />
                    </XButton>
                  </ImageWrapper>
                ))
              : null}

            {/* 사진 선택 버튼 */}
            <ImageWrapper
              onPress={() => {
                photoRbRef?.current?.open();
              }}
            >
              <FontAwesome5
                name="camera"
                color={color.COLOR_GRAY_ICON}
                size={35}
              />
            </ImageWrapper>
          </ImageContainer>
        </Container>
      </MainLayout>

      <BigButton
        text={"숙제 인증 사진 등록"}
        onPress={handleSubmitAssignment}
      />

      {/* 사진 선택 바텀시트 */}
      <SelectPhotoBSheet rbRef={photoRbRef} setImages={setImages} />
    </>
  );
};

export default SubmitHwScreen;

const Container = styled.View`
  width: 100%;
  padding-horizontal: 15;
  margin-vertical: 7;
`;

const ImageContainer = styled.View`
  width: 100%;
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
  gap: 9;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.Pressable`
  width: ${(dw - 30) / 3 - 6};
  height: ${(dw - 30) / 3 - 6};
  //   margin-bottom: 11;
  background-color: white;
  border-width: 1.5;
  border-color: ${color.COLOR_GRAY_BORDER};
  border-radius: 5;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const XButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  width: 30;
  height: 30;
  //   background-color: orange;
  align-items: center;
  justify-content: center;
`;
