import React from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import client from "../../config/axios";
import { storeData, getData } from "../../constants/asyncStorage";
import { Platform, Alert } from "react-native";

async function GetDevicePushTokenAndSend() {
  const FCMIsChanged = await getData("FCMIsChanged");
  if (FCMIsChanged === true) {
    registerForPushNotificationsAsync().then(async (token) => {
      console.log("token: ", token);
      postFCMToken(token);
    });
    await storeData("FCMIsChanged", false);
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

    // Expo 앱이나, 시뮬레이터가 아닌 기기일 경우,
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        // 알림 허용 여부에 따라 알람 설정 필요

        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "알림 거부 안내",
          "알림을 거부하면 수업 연결, 일정 변경, 숙제 제출 등 알림을 받지 못해요. 필요 시 앱 알림 설정에서 따로 설정해주세요."
        );
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
}

export default GetDevicePushTokenAndSend;