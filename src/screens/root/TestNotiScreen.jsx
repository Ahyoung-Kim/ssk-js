import React, { useEffect, useState, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import MainLayout from "../../components/common/MainLayout";
import client from "../../config/axios";

// 알림 핸들러 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 테스트 알림 보내는 함수 - ExpoPushToken일 때,
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "ExpoPushToken 테스트 알림 📬",
      body: "ExpoPushToken 테스트 알림입니다.",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

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
      alert("Failed to get push token for push notification!");
      return;
    }

    // token = (await Notifications.getExpoPushTokenAsync()).data;
    token = (
      await Notifications.getDevicePushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_EXPO_DEV_ID,
      })
    ).data;
    console.log(token);
  } else {
    alert("실제 기기를 사용해야 합니다!");
  }

  return token;
}

const TestNotiScreen = () => {
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

  return (
    <>
      <MainLayout headerText={"알림 테스트"} headerLeftType={"back"}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text>Your expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>
              Title: {notification && notification.request.content.title}{" "}
            </Text>
            <Text>
              Body: {notification && notification.request.content.body}
            </Text>
            <Text>
              Data:{" "}
              {notification &&
                JSON.stringify(notification.request.content.data)}
            </Text>
          </View>
          <Button
            title="Press to schedule a notification"
            onPress={async () => {
              await schedulePushNotification();
            }}
          />
          <Button
            title="Press to FCM Test"
            onPress={async () => {
              await getTest();
            }}
          />
        </View>
      </MainLayout>
    </>
  );
};

export default TestNotiScreen;
