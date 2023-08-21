import React from "react";

import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import color from "../../common/color";
import { dh } from "../../common/windowSize";

import ConfirmButtons from "./ConfirmButtons";

const ConfirmBtnBottomSheet = ({
  children,
  rbRef,
  heightPercentage = 0.5,
  onClose = () => {},
  cancelText = "취소",
  confirmText = "확인",
  filled = false,
  buttonColor,
  cancelButtonColor,
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <>
      <RBSheet
        ref={rbRef}
        height={dh * heightPercentage}
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
              paddingBottom: dh * 0.07 + 80,
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

        <ConfirmButtons
          cancelText={cancelText}
          confirmText={confirmText}
          filled={filled}
          buttonColor={buttonColor}
          cancelButtonColor={cancelButtonColor}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </RBSheet>
    </>
  );
};

export default ConfirmBtnBottomSheet;

const Contents = styled.ScrollView`
  height: 100%;
  padding-vertical: 10;
`;
