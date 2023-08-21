import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

import { storeData } from "../../constants/asyncStorage";

const OAuthLoginScreen = () => {
  const REDIRECT_URI = "http://naver.com";
  const BACKEND_URI = `http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
  const webViewRef = useRef();

  const navigation = useNavigation();

  const extractParameterFromUrl = (url, parameterName) => {
    const regex = new RegExp(`${parameterName}=([^&]+)`);
    const matches = url.match(regex);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null;
  };

  const handleRedirects = async (webview) => {
    const urlData = webview.url;
    if (urlData) {
      const accessToken = await extractParameterFromUrl(urlData, "accessToken");
      const refreshToken = await extractParameterFromUrl(
        urlData,
        "refreshToken"
      );
      const accessExpired = await extractParameterFromUrl(
        urlData,
        "accessExpired"
      );
      const isEnabled = await extractParameterFromUrl(urlData, "isEnabled");
      const userId = await extractParameterFromUrl(urlData, "userId");

      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("accessExpired:", accessExpired);
      console.log("isEnabled:", isEnabled);
      console.log("userId:", userId);

      await storeData("accessToken", accessToken);
      if (accessToken) {
        setTimeout(() => {
          if (isEnabled === "true") {
            console.log("1됨", isEnabled);
            navigation.navigate("TabNavigator");
          } else {
            console.log("2됨", isEnabled);
            navigation.navigate("OAuthInfoScreen");
          }
        }, 1500);
      }
    }
  };

  return (
    <WebView
      ref={(ref) => (webViewRef.current = ref)}
      source={{ uri: BACKEND_URI }}
      originWhitelist={["*"]}
      style={{ flex: 1 }}
      onNavigationStateChange={(webview) => handleRedirects(webview)}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      setSupportMultipleWindows={false}
    />
  );
};

export default OAuthLoginScreen;
