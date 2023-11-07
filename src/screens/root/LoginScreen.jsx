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

// 알림 핸들러 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 기기 푸시 알림 토큰 불러오기 함수
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // Expo 앱이나, 시뮬레이터가 아닌 기기일 경우,
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("알림 허용이 필요해요!", "알림 미설정 시 수업 연결, 일정 변경, 숙제 등의 알림을 받지 못해요.");
      return;
    }

    // token = (await Notifications.getExpoPushTokenAsync()).data;
    token = (
      await Notifications.getDevicePushTokenAsync()
    ).data;
    console.log(token);
  } else {
    alert("실제 기기를 사용해야 합니다!");
  }

  return token;
}

const LoginScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const successMessage = () =>
    Toast.show({ type: "success", text1: "성공적으로 로그인했습니다!" });
  const errorMessage = () =>
    Toast.show({ type: "error", text1: "아이디나 비밀번호를 확인해주세요!" });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // 백엔드 서버에 fcm 토큰 보내기 함수
  const postFCMToken = async (fcmToken) => {
    try {
      const ret = await client.post(`/api/fcm/token`, {
        fcmToken,
      });

      if (ret.status == 200) {
        console.log("success");
      }
    } catch (err) {
      console.log("post fcm token error: ", err);
    }
  };

  // 백엔드 서버 토큰 연동 테스트 함수
  const getTest = async () => {
    try {
      const ret = await client.get("/api/fcm/test");

      if (ret.status == 200) {
        console.log("success");
      }
    } catch (err) {
      console.log("get push test error: ", err);
    }
  };

  // 앱 구동 시 작동하는 리스너 생성, 설정 및 제거
  useEffect(() => {
    // FCM Token을 받아와 expoPushToken 에 저장 및 postFCMToken으로 전송
    registerForPushNotificationsAsync().then((token) => {
      console.log("token: ", token);
      setExpoPushToken(token);
      postFCMToken(token);
    });

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
