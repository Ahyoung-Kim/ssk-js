import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";
import color from "../../common/color";
import BigButton from "./BigButton";

import { dh } from "../../common/windowSize";

const BottomSheet = ({
  children,
  rbRef,
  heightPercentage = 0.5,
  height,
  onClose = () => {},
  button = null, // 버튼 텍스트
  handlePressButton = () => {},
  // confirmButton = null,
}) => {
  return (
    <>
      <RBSheet
        ref={rbRef}
        height={height ? height : dh * heightPercentage}
        onClose={onClose}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: color.COLOR_BSHEET_BACKGROUND,
          },
          draggableIcon: {
            backgroundColor: color.COLOR_TAB_ICON,
          },
          container: {
            backgroundColor: color.COLOR_WHITE_BACKGROUND,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}
      >
        <Contents scrollEnabled={true}>
          <TouchableOpacity
            style={{
              paddingBottom: button ? dh * 0.07 + 80 : dh * 0.07,
              height: "100%",
              width: "100%",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
            activeOpacity={1}
          >
            {children}
          </TouchableOpacity>
        </Contents>

        {button ? (
          <BigButton text={button} onPress={handlePressButton} />
        ) : null}
      </RBSheet>
    </>
  );
};

export default BottomSheet;

const Contents = styled.ScrollView`
  height: 100%;
  padding-vertical: 10;
`;
