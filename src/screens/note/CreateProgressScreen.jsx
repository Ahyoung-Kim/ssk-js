import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";

const CreateProgressScreen = () => {
  return (
    <>
      <MainLayout
        headerText={"진도 보고 작성"}
        headerType={"back"}
      ></MainLayout>
    </>
  );
};

export default CreateProgressScreen;
