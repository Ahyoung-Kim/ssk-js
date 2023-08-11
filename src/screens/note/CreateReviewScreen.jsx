import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";

const CreateReviewScreen = () => {
  return (
    <>
      <MainLayout
        headerText={"복습 노트 추가"}
        headerType={"back"}
        bgColor="white"
      ></MainLayout>
    </>
  );
};

export default CreateReviewScreen;
