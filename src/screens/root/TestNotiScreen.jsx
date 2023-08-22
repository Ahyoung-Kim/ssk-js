import React, { useEffect, useState, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import MainLayout from "../../components/common/MainLayout";
import client from "../../config/axios";

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 알림 보내는 함수
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

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

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const TestNotiScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  useEffect(() => {
    // fcm token 을 받아와 expoPushToken 에 저장
    registerForPushNotificationsAsync().then((token) => {
      console.log("token: ", token);
      setExpoPushToken(token);
      postFCMToken(token);
    });

    // Listeners registered by this method will be called whenever a notification is received while the app is running.
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("notification: ", notification);
        setNotification(notification);
      });

    // Listeners registered by this method will be called whenever a user interacts with a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response: ", response);
      });

    // Removes a notification subscription returned by an addNotificationListener call
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
        </View>
      </MainLayout>
    </>
  );
};

export default TestNotiScreen;
