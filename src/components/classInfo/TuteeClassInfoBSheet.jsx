import React, { useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import { dh } from "../../common/windowSize";

import BottomSheet from "../common/BottomSheet";
import UpdateColorBSheet from "./UpdateColorBSheet";
import WithdrawModal from "../modal/WithdrawModal";

const TuteeClassInfoBSheet = ({ rbRef, classInfo, setRefetch }) => {
  const updateColorRef = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  const onPressUpdateColor = () => {
    updateColorRef?.current?.open();
  };

  return (
    <>
      <BottomSheet rbRef={rbRef} heightPercentage={0.25}>
        <TouchableArea onPress={onPressUpdateColor}>
          <Text>수업 색상 변경</Text>
        </TouchableArea>
        <TouchableArea onPress={() => setModalVisible(true)}>
          <Text>수업 나가기</Text>
        </TouchableArea>

        <UpdateColorBSheet
          rbRef={updateColorRef}
          tutoringId={classInfo.tutoringId}
          colorKey={classInfo.color}
          setRefetch={setRefetch}
        />

        <WithdrawModal
          classInfoRef={rbRef}
          tutoringId={classInfo?.tutoringId}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </BottomSheet>
    </>
  );
};

export default TuteeClassInfoBSheet;

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
