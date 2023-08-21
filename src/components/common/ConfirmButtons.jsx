import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const ConfirmButtons = ({
  confirmText,
  cancelText = "취소",
  buttonColor,
  cancelButtonColor,
  filled,
  onCancel,
  onConfirm,
}) => {
  return (
    <Container>
      <Button onPress={onCancel} buttonColor={cancelButtonColor}>
        <ButtonText textColor={cancelButtonColor}>{cancelText}</ButtonText>
      </Button>
      <Button onPress={onConfirm} buttonColor={buttonColor} filled={filled}>
        <ButtonText textColor={filled ? "white" : buttonColor}>
          {confirmText}
        </ButtonText>
      </Button>
    </Container>
  );
};

export default ConfirmButtons;

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${windowWidth};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30;
  padding-horizontal: 15;
  background-color: white;
`;

const Button = styled.Pressable`
  width: 48%;
  height: 41;
  align-items: center;
  justify-content: center;
  background-color: ${({ buttonColor, filled }) =>
    buttonColor && filled ? buttonColor : color.COLOR_WHITE_BACKGROUND};
  border-radius: 5;
  border-width: 2;
  border-color: ${({ buttonColor }) =>
    buttonColor ? buttonColor : color.COLOR_GRAY_BUTTON};
`;

const ButtonText = styled.Text`
  color: ${({ textColor }) =>
    textColor ? textColor : color.COLOR_GRAY_BUTTON};
  font-weight: bold;
  font-size: 18;
`;
