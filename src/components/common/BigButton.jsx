import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

const BigButton = ({ text, onPress }) => {
  return (
    <Wrapper>
      <Button onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </Button>
    </Wrapper>
  );
};

export default BigButton;

const Wrapper = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding-top: 10;
  padding-bottom: 30;
  padding-horizontal: 15;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
`;

const Button = styled.Pressable`
  background-color: ${color.COLOR_MAIN};
  width: 100%;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 5;
  height: 45;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18;
`;
