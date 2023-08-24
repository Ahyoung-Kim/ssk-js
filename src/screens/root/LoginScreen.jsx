import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";
import { Keyboard } from "react-native";

import Layout from "../../components/common/Layout";
import PageWrapper from "../../components/common/PageWrapper";
import Margin from "../../components/common/Margin";
import LoginLogo from "../../components/login/LoginLogo";
import LoginForm from "../../components/login/LoginForm";
import LoginOptions from "../../components/login/LoginOptions";
import KakaoLogin from "../../components/login/KakaoLogin";

const LoginScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const successMessage = () =>
    Toast.show({ type: "success", text1: "성공적으로 로그인했습니다!" });
  const errorMessage = () =>
    Toast.show({ type: "error", text1: "아이디나 비밀번호를 확인해주세요!" });

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

  return (
    <>
      <Layout>
        <PageWrapper>
          {/* <Toast position="top" topOffset={20} visibilityTime={1200} />
          <ContentWrapper>
            <LoginLogo />
            <Margin size={40} />
            <KakaoLogin />
          </ContentWrapper> */}
          <Toast position="top" topOffset={20} visibilityTime={1200} />
          <Margin size={90} />
          {!isKeyboardShown && (
            <>
              <Margin size={40} />
              <LoginLogo />
              <Margin size={40} />
            </>
          )}
          <LoginForm
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
          <KakaoLogin />
          <LoginOptions />
        </PageWrapper>
      </Layout>
    </>
  );
};

export default LoginScreen;

// styled
const ContentWrapper = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
