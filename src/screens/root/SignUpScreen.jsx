import React, {useState} from "react";
import styled from "styled-components/native";

import Layout from "../../components/common/Layout";
import Margin from "../../components/common/Margin";
import Header from "../../components/common/Header";
import SignUpTitle from "../../components/signUp/SignUpTitle";
import SignUpProgressCircle from "../../components/signUp/SignUpProgressCircle";
import RolePage from "../../pages/signUp/RolePage";
import BasicInfoPage from "../../pages/signUp/BasicInfoPage";
import CompletePage from "../../pages/signUp/CompletePage";
import ProgressButton from "../../components/signUp/ProgressButton";

const SignUpScreen = () => {
  const [role, setRole] = useState("Tutor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("RolePage");

  let pageComponent;
  switch(page) {
    case "RolePage":
      pageComponent = (
        <>
          <SignUpTitle>
            1. 가입 유형 선택하기
          </SignUpTitle>
          <RolePage
            role={role}
            setRole={setRole}
          />
        </>
      )
      break;
    case "BasicInfoPage":
      pageComponent = (
        <>
          <SignUpTitle>
            2. 로그인 정보 기입하기
          </SignUpTitle>
          <BasicInfoPage
            email={email}
            password={password}
            name={name}
            setEmail={setEmail}
            setPassword={setPassword}
            setName={setName}
          />
        </>
      )
      break;
    case "CompletePage":
      pageComponent = (
        <CompletePage />
      )
      break;
    default:
      break;
  }

  return (
    <Layout>
      <Header text="회원가입" type="withBack"/>
      <Margin size={30} />
      <SignUpProgressCircle />
      <Margin size={10} />
      <ComponentWrapper>
        {pageComponent}
      </ComponentWrapper>
      <ButtonWrapper>
        <ProgressButton
          role={role}
          email={email}
          password={password}
          name={name}
          page={page} 
          setPage={setPage}
        />
      </ButtonWrapper>
    </Layout>
  );
};

export default SignUpScreen;

// styled
const ComponentWrapper = styled.View`
  flex: 1;
`;

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;