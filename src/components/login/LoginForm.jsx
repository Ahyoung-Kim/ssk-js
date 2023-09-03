import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { storeData, getData } from "../../constants/asyncStorage";
import moment from "moment";
import { APIURL } from "../../config/key";

const LoginForm = ({ successMessage, errorMessage }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setStorageData = async (data) => {
    const { accessExpired, accessToken, enabled, refreshToken, userId } = data;

    await storeData("accessToken", accessToken);
    await storeData("accessExpired", accessExpired);
    await storeData("userId", userId);
    await storeData("refreshToken", refreshToken);
  };

  const getStorageData = async () => {
    const accessToken = await getData("accessToken");
    const accessExpired = await getData("accessExpired");
    const refreshToken = await getData("refreshToken");
    const userId = await getData("userId");

    console.log({ accessExpired, accessToken, refreshToken, userId });
  };

  const handleLoginButton = async () => {
    const loginData = {
      userId: email,
      password: password,
    };

    try {
      const response = await axios.post(`${APIURL}/api/auth/login`, loginData);

      if (response.status == 200) {
        await setStorageData(response.data);
        successMessage();
        setTimeout(() => {
          navigation.navigate("TabNavigator");
        }, 2000);
      }
    } catch (error) {
      errorMessage();
      console.log("error: ", error);
    }
  };

  return (
    <>
      <Wrapper>
        <InputWrapper>
          <FormInput
            editable
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="이메일"
            placeholderTextColor="#979797"
          />
        </InputWrapper>
        <InputWrapper>
          <FormInput
            editable
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="비밀번호"
            placeholderTextColor="#979797"
            secureTextEntry={true}
          />
        </InputWrapper>
        <LoginButton onPress={handleLoginButton}>
          <LoginText>로그인 하기</LoginText>
        </LoginButton>
      </Wrapper>
    </>
  );
};

export default LoginForm;

// styled
const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 5px 30px;
`;

const InputWrapper = styled.View`
  background-color: #e9ecef;
  border-radius: 6px;
  padding: 4px 4px;
`;

const FormInput = styled.TextInput`
  padding: 4px 10px;
  color: #0c9bfb;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0c9bfb;
  padding: 9px;
`;

const LoginText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #fff;
`;
