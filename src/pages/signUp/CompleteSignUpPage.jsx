import React, { useEffect, useRef } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import SignUpPageContainer from "../../components/signUp/SignUpPageContainer";
import { Animated } from "react-native";

const CompleteSignUpPage = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SignUpPageContainer text={"회원가입 성공"}>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          opacity: animation,
        }}
      >
        <LogoImage source={require("../../assets/brands/login.png")} />

        <TextWrapper>
          <Text>축하합니다!</Text>
          <Text>
            성공적으로 <Highlight>회원가입</Highlight>에 완료했습니다!
          </Text>
          <Text>
            <Highlight>수숙관</Highlight>에 오신 것을 환영합니다!
          </Text>
        </TextWrapper>
      </Animated.View>
    </SignUpPageContainer>
  );
};

export default CompleteSignUpPage;

const Container = styled.View`
  width: 100%;
  height: 100%;
  //   background-color: orange;
  justify-content: center;
`;

const LogoImage = styled.Image`
  width: 100%;
  height: 100;
  resize-mode: contain;
  margin-bottom: 50;
`;

const TextWrapper = styled.View`
  //   flex-direction: row;
  //   align-items: center;
`;

const Text = styled.Text`
  font-size: 24;
  font-weight: bold;
  margin-vertical: 5;
  flex-shrink: 1;
`;

const Highlight = styled.Text`
  color: ${color.COLOR_MAIN};
`;
