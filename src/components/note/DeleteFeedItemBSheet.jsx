import React from "react";

import styled from "styled-components/native";
import { dh } from "../../common/windowSize";

import BottomSheet from "../common/BottomSheet";
import client from "../../config/axios";
import { Alert } from "react-native";

const DeleteFeedItemBSheet = ({ rbRef, submitId }) => {
  const handleDeleteSubmit = async () => {
    try {
      const ret = await client.delete(`/api/assignment/submit/${submitId}`);

      if (ret.status == 200) {
        Alert.alert("삭제 되었습니다.");
        rbRef?.current?.close();
      }
    } catch (err) {
      console.log("delete assignment submit error: ", err);
    }
  };

  const onPress = () => {
    Alert.alert("삭제", "해당 숙제 인증 사진을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: handleDeleteSubmit,
      },
    ]);
  };
  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.2}>
        <TouchableArea onPress={onPress}>
          <Text>삭제하기</Text>
        </TouchableArea>
      </BottomSheet>
    </>
  );
};

export default DeleteFeedItemBSheet;

const TouchableArea = styled.TouchableOpacity`
  //   background-color: orange;
  width: 100%;
  height: ${dh * 0.05};
  padding-horizontal: 10;
  justify-content: center;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 18;
`;
