import React, { useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const KakaoLogin = () => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.navigate("OAuthLoginScreen");
  };

  return (
    <>
      <Wrapper>
        <LoginButton onPress={handleButton}>
          <ButtonText>카카오로 로그인하기</ButtonText>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fef01b;
  padding: 10px 0;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;
