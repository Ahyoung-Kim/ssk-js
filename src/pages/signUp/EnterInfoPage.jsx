import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import SignUpPageContainer from "../../components/signUp/SignUpPageContainer";

const InfoInput = ({
  label,
  value,
  setValue,
  placeholder,
  errorText,
  errorCondition,
  editable = true,
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <Container>
      <TextWrapper>
        <Label>{label}</Label>
        {errorCondition && <ErrorText>{errorText}</ErrorText>}
      </TextWrapper>

      <Input
        editable={editable}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        errorCondition={errorCondition}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </Container>
  );
};

const EnterInfoPage = ({
  name,
  setName,
  userId,
  setUserId,
  password,
  setPassword,
  pwdConfirm,
  setPwdConfirm,
}) => {
  return (
    <SignUpPageContainer text="2. 로그인 정보 기입">
      <InfoInput
        label={"이름"}
        value={name}
        setValue={setName}
        placeholder={"이름을 입력해주세요."}
      />

      <InfoInput
        label={"이메일"}
        value={userId}
        setValue={setUserId}
        placeholder={"이메일을 입력해주세요."}
        keyboardType="email-address"
      />

      <InfoInput
        label={"비밀번호"}
        value={password}
        setValue={setPassword}
        placeholder={"비밀번호를 입력해주세요."}
        secureTextEntry={true}
      />

      <InfoInput
        label={"비밀번호 확인"}
        value={pwdConfirm}
        setValue={setPwdConfirm}
        errorCondition={password && pwdConfirm && password !== pwdConfirm}
        errorText={"비밀번호가 일치하지 않습니다."}
        editable={password ? true : false}
        placeholder={"비밀번호를 확인해주세요."}
        secureTextEntry={true}
      />
    </SignUpPageContainer>
  );
};

export default EnterInfoPage;

const Container = styled.View`
  width: 100%;
  margin-bottom: 20;
  //   background-color: orange;
`;

const TextWrapper = styled.View`
  margin-bottom: 7;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const Label = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_MAIN};
`;

const Input = styled.TextInput`
  width: 100%;
  border-radius: 5;
  border-width: 1;
  border-color: ${({ errorCondition }) =>
    errorCondition ? color.COLOR_RED_TEXT : color.COLOR_GRAY_BORDER};
  padding-vertical: 15;
  padding-horizontal: 15;
  background-color: ${({ editable }) =>
    editable ? "white" : color.COLOR_GRAY_BACKGROUND};
`;

const ErrorText = styled.Text`
  color: ${color.COLOR_RED_TEXT};
  font-size: 12;
`;
