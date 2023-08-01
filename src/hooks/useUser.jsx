import React, { useEffect, useState } from "react";
import { getData, storeData } from "../constants/asyncStorage";
import client from "../config/axios";
import { Platform } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";

const useUser = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const getUserData = async () => {
    let role = await getData("role");
    let name = await getData("name");
    let userId = await getData("userId");

    if (!userId) {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "LoginScreen" }],
        })
      );
      navigation.navigate("LoginScreen");
    } else if (!role || !name || !userId) {
      try {
        const ret = await client.get("/api/user/detail");
        if (ret.status == 200) {
          role = ret.data.role;
          name = ret.data.name;
          userId = ret.data.userId;
          await storeData("role", role);
          await storeData("name", name);
          await storeData("userId", userId);
        }
      } catch (err) {
        console.log(`useUser error in ${Platform.OS}: `, err);
        if (err.response && err.response.status) {
          const status = err.response.status;
          if (status == 401) {
            navigation.navigate("LoginScreen");
          } else if (status == 400) {
            console.log("useUser: getUserData bad request");
          }
        }
      }
    }

    setUserData({
      role,
      name,
      userId,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (userData) {
    return userData;
  }
};

export default useUser;
