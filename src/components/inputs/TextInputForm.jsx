import React from "react";
import styled, { css } from "styled-components/native";
import color from "../../common/color";
import InputContainer from "./InputContainer";

const TextInputForm = ({
  label,
  value,
  onChangeText,
  placeholder,
  height,
  multiline = false,
  button = "",
  handleButtonPress = () => {},
  editable = true,
  buttonColor = color.COLOR_MAIN,
}) => {
  return (
    <>
      <InputContainer label={label} height={height}>
        <Container>
          <InputForm
            multiline={multiline}
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={
              multiline
                ? {
                    paddingTop: 10,
                    paddingBottom: 10,
                  }
                : {}
            }
            width={button ? "80%" : "100%"}
            editable={editable}
          />

          {button && (
            <Button
              buttonColor={buttonColor}
              onPress={handleButtonPress}
              activeOpacity={0.5}
            >
              <ButtonText>{button}</ButtonText>
            </Button>
          )}
        </Container>
      </InputContainer>
    </>
  );
};

export default TextInputForm;

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputForm = styled.TextInput`
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  border-color: ${({ editable }) =>
    editable ? color.COLOR_MAIN : color.COLOR_GRAY_BORDER};
  border-width: 1;
  border-radius: 5px;
  padding-horizontal: 15;
  font-size: 16;
  text-align-vertical: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ buttonColor }) => buttonColor};
  width: 19%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-radius: 5px;
  border-color: ${({ buttonColor }) => buttonColor};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16;
`;
