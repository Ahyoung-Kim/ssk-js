import { APIURL } from "./key";
import axios from "axios";
import { getData } from "../constants/asyncStorage";

const client = axios.create({
  baseURL: APIURL,
  headers: {
    Accept: "application/json",
  },
});

const requestHandler = async (config) => {
  // AsyncStorage 에서 accessToken 가져와 헤더에 넣는 작업
  const token = await getData("accessToken");
  config.headers["Authorization"] = `Bearer ${token}`;

  // console.log("클라이언트 config: ", config);

  return config;
};

const requestErrorHandler = async (error) => {
  console.log("client request error: ", error);
  return Promise.reject(error);
};

client.interceptors.request.use(
  (config) => requestHandler(config),
  (error) => requestErrorHandler(error)
);

export default client;
