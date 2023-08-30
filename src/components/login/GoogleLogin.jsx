import React, { useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import googleLogo from "../../assets/images/google_logo.png";

const GoogleLogin = () => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.navigate("GoogleLoginScreen");
  };

  return (
    <>
      <Wrapper>
        <LoginButton onPress={handleButton}>
          <LogoImage source={googleLogo} />
          <ButtonText>구글 로그인</ButtonText>
          <Blank />
        </LoginButton>
      </Wrapper>
    </>
  );
};

export default GoogleLogin;

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
  height: 38px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #4285f4;
  padding: 0px 10px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #fff;
`;

const LogoImage = styled.Image`
  width: 30px;
  height: 30px;
`;

const Blank = styled.View`
  width: 20px;
  height: 20px;
`;
