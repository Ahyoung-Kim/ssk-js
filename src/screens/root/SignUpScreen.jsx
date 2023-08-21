import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import MainLayout from "../../components/common/MainLayout";
import PrevNextButtons from "../../components/common/PrevNextButtons";
import { useNavigation } from "@react-navigation/native";
import SignUpProgress from "../../components/signUp/SignUpProgress";
import SelectRolePage from "../../pages/signUp/SelectRolePage";
import EnterInfoPage from "../../pages/signUp/EnterInfoPage";
import CompleteSignUpPage from "../../pages/signUp/CompleteSignUpPage";
import { Alert } from "react-native";
import AgreementPage from "../../pages/signUp/AgreementPage";
import BigButton from "../../components/common/BigButton";
import Loading from "../../components/common/Loading";
import axios from "axios";
import { APIURL } from "../../config/key";

export const PageType = {
  ROLE: 1, // 역할 선택 페이지
  INFO: 2, // 정보 기입 페이지
  AGREEMENT: 3, //약관 동의 페이지,
  COMPLETE: 4, // 회원가입 완료 페이지
};

export const RoleType = {
  TUTOR: "tutor",
  TUTEE: "tutee",
  PARENT: "parent",
};

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [page, setPage] = useState(PageType.ROLE);

  const [role, setRole] = useState(""); // RoleType
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

  const [agreement, setAgreement] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const ret = await axios.post(`${APIURL}/api/auth/signup`, {
        name,
        userId,
        password,
        role,
      });

      if (ret.status == 200) {
        console.log("signUp success");
      }
    } catch (err) {
      console.log("sign up error: ", err);
      const status = err?.response?.status;

      if (status == 409) {
        // conflict
        Alert.alert("이미 존재하는 이메일 입니다.");
        setPage(PageType.INFO);
      }
    }
    setLoading(false);
  };

  const onPressPrev = () => {
    if (page === PageType.ROLE) {
      navigation.navigate("LoginScreen");
    } else {
      setPage(page - 1);
    }
  };

  const onPressNext = () => {
    if (page === PageType.ROLE && !role) {
      Alert.alert("가입 유형을 선택해주세요!");
      return;
    } else if (page === PageType.INFO) {
      if (!name || !userId || !password || !pwdConfirm) {
        Alert.alert("로그인 정보를 모두 기입해주세요!");
        return;
      }
      if (password !== pwdConfirm) {
        Alert.alert("비밀번호를 확인해주세요!");
        return;
      }
    } else if (page === PageType.AGREEMENT && !agreement) {
      Alert.alert("필수 약관에 동의해주세요!");
      return;
    }

    if (page === PageType.COMPLETE) {
      navigation.navigate("LoginScreen");
    } else {
      setPage(page + 1);
    }

    if (page === PageType.AGREEMENT) {
      handleSignUp();
    }
  };

  return (
    <KeyboardAvoidingLayout>
      <MainLayout headerText={"회원가입"} bgColor="white">
        <SignUpProgress page={page} />
        <PageContainer>
          {loading ? (
            <Loading />
          ) : (
            <>
              {page === PageType.ROLE ? (
                <SelectRolePage setRole={setRole} role={role} />
              ) : page === PageType.INFO ? (
                <EnterInfoPage
                  name={name}
                  setName={setName}
                  userId={userId}
                  setUserId={setUserId}
                  password={password}
                  setPassword={setPassword}
                  pwdConfirm={pwdConfirm}
                  setPwdConfirm={setPwdConfirm}
                />
              ) : page === PageType.AGREEMENT ? (
                <AgreementPage
                  agreement={agreement}
                  setAgreement={setAgreement}
                />
              ) : page === PageType.COMPLETE ? (
                <CompleteSignUpPage />
              ) : null}
            </>
          )}
        </PageContainer>
      </MainLayout>

      {page === PageType.COMPLETE ? (
        <BigButton text={"로그인으로 돌아가기"} onPress={onPressNext} />
      ) : (
        <PrevNextButtons onPressPrev={onPressPrev} onPressNext={onPressNext} />
      )}
    </KeyboardAvoidingLayout>
  );
};

export default SignUpScreen;

const PageContainer = styled.View``;
