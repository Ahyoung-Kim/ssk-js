import { APIURL } from "./key";
import axios from "axios";
import { getData } from "../constants/asyncStorage";
import navigation from "./navigation";

const client = axios.create({
  baseURL: APIURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async function (config) {
    const token = await getData("access-token");
    // console.log("token", token);

    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("client config: ", config);
    return config;
  },
  function (error) {
    console.log(error);
  }
);

client.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    navigation.navigate("LoginScreen");
    return Promise.reject(error);
  }
);

export default client;
