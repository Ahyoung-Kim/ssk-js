import { APIURL } from "./key";
import axios from "axios";
import { clearData, getData, storeData } from "../constants/asyncStorage";

const client = axios.create({
  baseURL: APIURL,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use(
  // 요청을 보내기 전 헤더에 accessToken 담아서 보내기
  async function (config) {
    const token = await getData("accessToken");
    // console.log("token", token);

    config.headers["Authorization"] = `Bearer ${token}`;
    // console.log("client config: ", config);
    return config;
  },
  function (error) {
    console.log("client error: ", error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    // 200 대 이외의 응답 오류 핸들링
    const {
      config,
      response: { status },
    } = error;

    if (status == 401) {
      // Unauthorized error
      console.log("Unauthorized Error");
      const originalRequest = config;
      const refreshToken = await getData("refreshToken");
      const oldAccessToken = await getData("accessToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        console.log("refreshToken: ", refreshToken);
        // 토큰 재발급 IF-43
        const ret = await axios.post(
          `${APIURL}/api/auth/refresh`,
          {
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${oldAccessToken}`,
            },
          }
        );

        console.log("토큰 재발급: ", ret.data);
        if (ret.status == 200) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            ret.data;
          await storeData("accessToken", newAccessToken);
          await storeData("refreshToken", newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        }
      } catch (err) {
        // refreshToken 만료
        console.log("토큰 재발급 에러: ", err);
        await clearData();
      }
    } else if (status == 400) {
      // Bad Request
      console.log("Bad request");
    } else if (status == 409) {
      // Conflict
      console.log("request conflict");
    }

    return Promise.reject(error);
  }
);

export default client;
