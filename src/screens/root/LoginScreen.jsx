import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";
import { Keyboard, Platform, Alert } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import client from "../../config/axios";
import Layout from "../../components/common/Layout";
import PageWrapper from "../../components/common/PageWrapper";
import Margin from "../../components/common/Margin";
import LoginLogo from "../../components/login/LoginLogo";
import LoginForm from "../../components/login/LoginForm";
import LoginOptions from "../../components/login/LoginOptions";
import KakaoLogin from "../../components/login/KakaoLogin";
import GoogleLogin from "../../components/login/GoogleLogin";

import storeData from "../../constants/asyncStorage";

// 알림 핸들러 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const LoginScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const successMessage = () =>
    Toast.show({ type: "success", text1: "성공적으로 로그인했습니다!" });
  const errorMessage = () =>
    Toast.show({ type: "error", text1: "아이디나 비밀번호를 확인해주세요!" });

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function initFCMIsChanged() {
    await storeData("FCMIsChanged", false);
  }

  // 앱 구동 시 작동하는 리스너 생성, 설정 및 제거
  useEffect(() => {
    initFCMIsChanged();

    // 앱 구동 시 알림 받았을 때의 요청 리스너
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("notification: ", notification);
        setNotification(notification);
      });

    // 유저가 알림과 상호작용할 경우의 응답리스너
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response: ", response);
      });

    // 알림 리스너 제거
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // 키보드 화면 가리는 이슈 방지
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
          <Toast position="top" topOffset={20} visibilityTime={1200} />
          <Margin size={90} />
          {!isKeyboardShown && (
            <>
              <Margin size={20} />
              <LoginLogo />
              <Margin size={20} />
            </>
          )}
          {/* <LoginForm
            successMessage={successMessage}
            errorMessage={errorMessage}
          /> */}
          <Margin size={10} />
          <KakaoLogin />
          <GoogleLogin />
          <Margin size={20} />
          {/* <LoginOptions /> */}
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
