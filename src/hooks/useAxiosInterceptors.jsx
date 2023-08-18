import React, { useCallback, useEffect } from "react";

import { CommonActions, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import client from "../config/axios";
import { clearData, getData, storeData } from "../constants/asyncStorage";
import axios from "axios";
import { APIURL } from "../config/key";
import { useDispatch } from "react-redux";
import { clearClassList } from "../redux/actions/classListAction";
import useClearRedux from "./useClearRedux";

const useAxiosInterceptors = () => {
  const navigation = useNavigation();
  const clearReduxData = useClearRedux();

  const toast = () =>
    Toast.show({
      type: "error",
      text1: "사용자 정보가 만료되었습니다.",
      text2: "다시 로그인해주세요.",
      visibilityTime: 3000,
    });

  const handleUnauthorization = async () => {
    toast();
    navigation.navigate("LoginScreen");
    await clearData();
    await clearReduxData(true);
  };

  const responseHandler = async (response) => {
    return response;
  };

  const responseErrorHandler = async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status == 401) {
      // Unauthorized error
      console.log("Unauthorized error");
      const targetRequest = config;
      const refreshToken = await getData("refreshToken");
      const accessToken = await getData("accessToken");

      if (!refreshToken) {
        console.log("refreshToken 없음");
        handleUnauthorization();
        return Promise.reject(error);
      }

      try {
        console.log("refreshToken: ", refreshToken);
        // 토큰 재발급
        const ret = await axios.post(
          `${APIURL}/api/auth/refresh`,
          {
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (ret.status == 200) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            ret.data;

          await storeData("accessToken", newAccessToken);
          await storeData("refreshToken", newRefreshToken);

          targetRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(targetRequest);
        }
      } catch (err) {
        console.log("토큰 재발급 에러: ", err);
        await clearData();
        handleUnauthorization();
      }
    } else if (status == 400) {
      // Bad Request
      console.log("Bad Request");
    } else if (status == 409) {
      // Conflict
      console.log("request conflict");
    }

    return Promise.reject(error);
  };

  const responseInterceptor = client.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => responseErrorHandler(error)
  );

  useEffect(() => {
    return () => {
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
};

export default useAxiosInterceptors;
