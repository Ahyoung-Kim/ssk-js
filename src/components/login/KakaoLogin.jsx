import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import kakaoLoginButton from "../../assets/images/kakaoLogin.png";

const KakaoLogin = () => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.navigate("KakaoLoginScreen");
  };

  return (
    <>
      <Wrapper>
        <LoginButton onPress={handleButton}>
          <LoginButtonImage
            className="login_button"
            source={kakaoLoginButton}
            alt="카카오 로그인 버튼"
            style={{ height: 38 }}
          />
        </LoginButton>
      </Wrapper>
    </>
  );
};

export default KakaoLogin;

// styled
const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

const LoginButtonImage = styled.Image`
  width: 100%;
`;
