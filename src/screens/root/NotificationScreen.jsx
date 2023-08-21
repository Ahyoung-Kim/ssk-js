import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { getData } from "../../constants/asyncStorage";

import MainLayout from "../../components/common/MainLayout";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const accessToken = await getData("accessToken");
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  // const sendToken = expoPushToken.match(/\[(.*?)\]/)[1];

  const body = {
    fcmToken: expoPushToken,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  try {
    const response = await axios.post(
      "http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/api/fcm/token",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    console.log(response.message);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

const getTestPush = async () => {
  const accessToken = await getData("accessToken");
  try {
    const response = await axios.get(
      "http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/api/fcm/test",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

async function registerForPushNotificationsAsync() {
  let token;
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
    token = (
      await Notifications.getDevicePushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_EXPO_DEV_ID,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const NotificationScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    getTestPush();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <MainLayout bgColor={"white"} headerText="알림" headerLeftType="back">
      <NotificationButton
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      >
        <ButtonText>토큰 내놔</ButtonText>
      </NotificationButton>
    </MainLayout>
  );
};

export default NotificationScreen;

// styled
const NotificationButton = styled.TouchableOpacity``;

const ButtonText = styled.Text``;
