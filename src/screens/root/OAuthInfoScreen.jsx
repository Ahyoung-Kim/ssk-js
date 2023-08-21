import React from "react";
import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import OAuthInfoForm from "../../components/login/OAuthInfoForm";

const OAuthInfoScreen = () => {
  return (
    <MainLayout headerText="가입 정보 기입">
      <OAuthInfoForm />
    </MainLayout>
  );
};

export default OAuthInfoScreen;
