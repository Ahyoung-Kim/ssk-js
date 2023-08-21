import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import { useNavigation } from "@react-navigation/native";

const PrevNextButtons = ({ onPressPrev, onPressNext }) => {
  const navigation = useNavigation();

  const onPressPrevButton = () => {
    if (onPressPrev) {
      onPressPrev();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <Wrapper>
        <Button prev={true} onPress={onPressPrevButton}>
          <ButtonText prev={true}>이전</ButtonText>
        </Button>
        <Button onPress={onPressNext}>
          <ButtonText>다음</ButtonText>
        </Button>
      </Wrapper>
    </>
  );
};

export default PrevNextButtons;

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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ prev }) =>
    prev ? color.COLOR_WHITE_BACKGROUND : color.COLOR_MAIN};
  width: 25%;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 41;
  border-width: 2;
  border-color: ${color.COLOR_MAIN};
`;

const ButtonText = styled.Text`
  color: ${({ prev }) => (prev ? color.COLOR_MAIN : "#fff")};
  font-weight: bold;
  font-size: 18;
`;
