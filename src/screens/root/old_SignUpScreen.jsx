// deprecated
import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";

import Layout from "../../components/common/Layout";
import Margin from "../../components/common/Margin";
import Header from "../../components/common/Header";
import SignUpTitle from "../../components/signUp/SignUpTitle";
import SignUpProgressCircle from "../../components/signUp/SignUpProgressCircle";
import RolePage from "../../pages/signUp/RolePage";
import BasicInfoPage from "../../pages/signUp/BasicInfoPage";
import CompletePage from "../../pages/signUp/CompletePage";
import ProgressButton from "../../components/signUp/ProgressButton";

const SignUpScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [role, setRole] = useState("Tutor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("RolePage");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => {
        setIsKeyboardShown(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setIsKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  let pageComponent;
  switch (page) {
    case "RolePage":
      pageComponent = (
        <>
          <SignUpTitle>1. 가입 유형 선택하기</SignUpTitle>
          <RolePage role={role} setRole={setRole} />
        </>
      );
      break;
    case "BasicInfoPage":
      pageComponent = (
        <>
          {!isKeyboardShown && (
            <SignUpTitle>2. 로그인 정보 기입하기</SignUpTitle>
          )}
          <BasicInfoPage
            email={email}
            password={password}
            name={name}
            setEmail={setEmail}
            setPassword={setPassword}
            setName={setName}
            isKeyboardShown={isKeyboardShown}
          />
        </>
      );
      break;
    case "CompletePage":
      pageComponent = <CompletePage />;
      break;
    default:
      break;
  }

  return (
    <Layout>
      <Header headerText="회원가입" />
      <Margin size={30} />
      {!isKeyboardShown && <SignUpProgressCircle page={page} />}
      <Margin size={10} />
      <ComponentWrapper>{pageComponent}</ComponentWrapper>
      {!isKeyboardShown && (
        <ButtonWrapper>
          <ProgressButton
            role={role}
            email={email}
            password={password}
            name={name}
            page={page}
            setPage={setPage}
          />
        </ButtonWrapper>
      )}
    </Layout>
  );
};

export default SignUpScreen;

// styled
const ComponentWrapper = styled.View`
  flex: 1;
`;

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;
