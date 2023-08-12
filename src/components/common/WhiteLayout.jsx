import React from "react";
import styled from "styled-components/native";
import color from "../../common/color";

// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import Header from "./Header";

const WhiteLayout = ({
  children,
  headerText,
  headerLeftType,
  headerRightType,
  handlePressHeaderLeft,
  handlePressHeaderRight,
}) => {
  return (
    <Wrapper>
      <Header
        headerText={headerText}
        headerLeftType={headerLeftType}
        headerRightType={headerRightType}
        handlePressHeaderLeft={handlePressHeaderLeft}
        handlePressHeaderRight={handlePressHeaderRight}
      />
      <Inner>
        <Contents>{children}</Contents>
      </Inner>
    </Wrapper>
  );
};

export default WhiteLayout;

const Wrapper = styled(SafeAreaView)`
  width: 100%;
  flex: 1;
  background-color: ${color.COLOR_MAIN};
`;

const Inner = styled.ScrollView`
  width: 100%;
  flex: 1;
  background-color: #fff;
`;

const Contents = styled.View`
  width: 100%;
  flex: 1;
  background-color: #fff;
  padding-bottom: 100;
`;
