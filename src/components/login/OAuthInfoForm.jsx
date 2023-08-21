import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import color from "../../common/color";
import { getData } from "../../constants/asyncStorage";

const OAuthInfoForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [role, setRole] = useState("tutor");

  const handleTutorButton = () => {
    setRole("tutor");
  };

  const handleTuteeButton = () => {
    setRole("tutee");
  };

  const handleSubmitButton = async () => {
    try {
      const token = await getData("accessToken");
      const data = { role: role, name: name };
      console.log("보내기 전: ", data);
      const response = await axios.post(
        "http://ec2-43-201-71-214.ap-northeast-2.compute.amazonaws.com/api/user/signup",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response.data);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Wrapper>
      <QuestionText>이름을 입력해주세요.</QuestionText>
      <ContentContainer>
        <NameInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="이름 입력"
        />
      </ContentContainer>
      <QuestionText>역할을 설정해주세요.</QuestionText>
      <ContentContainer>
        <RoleButton role="tutor" isSelected={role} onPress={handleTutorButton}>
          <RoleText role="tutor" isSelected={role}>
            Tutor
          </RoleText>
        </RoleButton>
        <RoleButton role="tutee" isSelected={role} onPress={handleTuteeButton}>
          <RoleText role="tutee" isSelected={role}>
            Tutee
          </RoleText>
        </RoleButton>
      </ContentContainer>
      <SubmitButton onPress={handleSubmitButton}>
        <SubmitText>시작하기</SubmitText>
      </SubmitButton>
    </Wrapper>
  );
};

export default OAuthInfoForm;

// styled
const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px 30px;
  gap: 20px;
`;

const QuestionText = styled.Text`
  color: ${color.COLOR_GRAY_TITLE};
  font-size: 18px;
  line-height: 22px;
  font-family: "Bold";
`;

const ContentContainer = styled.View`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${color.COLOR_MAIN};
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RoleButton = styled.TouchableOpacity`
  width: 50%;
  background-color: ${(props) =>
    props.isSelected === props.role ? color.COLOR_MAIN : "#fff"};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RoleText = styled.Text`
  color: ${(props) =>
    props.isSelected === props.role ? "#fff" : color.COLOR_GRAY_TEXT}
  font-size: 14px;
  font-family: "Medium";
  padding: 10px;
`;

const NameInput = styled.TextInput`
  width: 100%;
  padding: 5px 12px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.COLOR_MAIN};
  padding: 12px;
  border-radius: 12px;
`;

const SubmitText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "ExtraBold";
  line-height: 22px;
`;
