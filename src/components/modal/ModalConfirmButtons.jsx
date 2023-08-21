import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const ModalConfirmButtons = ({
  confirmText,
  cancelText = "취소",
  buttonColor,
  cancelButtonColor,
  filled,
  onCancel,
  onConfirm,
}) => {
  return (
    <>
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
    </>
  );
};

export default ModalConfirmButtons;

const Container = styled.View`
  width: 100%;
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40;
`;

const Button = styled.Pressable`
  width: 48%;
  height: 41;
  align-items: center;
  justify-content: center;
  background-color: ${({ buttonColor, filled }) =>
    buttonColor && filled ? buttonColor : color.COLOR_WHITE_BACKGROUND};
  border-radius: 5px;
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
