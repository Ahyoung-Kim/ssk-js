import React, { useEffect, useState } from "react";
import { getData, storeData } from "../constants/asyncStorage";
import client from "../config/axios";
import { Platform } from "react-native";

const useUser = () => {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    let role = await getData("role");
    let name = await getData("name");
    let userId = await getData("userId");

    if (!role || !name || !userId) {
      try {
        const ret = await client.get("/api/user/detail");
        if (ret.status == 200) {
          role = ret.data.role;
          name = ret.data.name;
          userId = ret.data.userId;

          await storeData("role", role);
          await storeData("name", name);
          await storeData("userId", userId);
        } else if (ret.status == 400) {
          console.log("useUser: getUserData bad request");
        }
      } catch (err) {
        console.log(`useUser error in ${Platform.OS}: `, err);
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
