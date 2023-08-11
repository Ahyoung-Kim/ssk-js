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
}) => {
  return (
    <>
      <InputContainer label={label} height={height}>
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
        />
      </InputContainer>
    </>
  );
};

export default TextInputForm;

const InputForm = styled.TextInput`
  width: 100%;
  height: 100%;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  border-color: ${color.COLOR_MAIN};
  border-width: 1;
  border-radius: 5;
  padding-horizontal: 15;
  font-size: 16;
`;
