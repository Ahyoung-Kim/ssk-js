import React, { useState } from "react";
import styled from "styled-components/native";
import color from "../../common/color";

// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView, RefreshControl } from "react-native";
import Header from "./Header";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";

const MainLayout = ({
  children,
  headerText,

  handleRefresh,
  bgColor = color.COLOR_GRAY_BACKGROUND,
  headerLeftType,
  headerRightType,
  handlePressHeaderLeft,
  handlePressHeaderRight,
}) => {
  useAxiosInterceptors();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    if (handleRefresh) {
      setRefreshing(true);
      handleRefresh().then(() => {
        setRefreshing(false);
      });
    }
  };

  return (
    <Wrapper>
      <Header
        headerText={headerText}
        headerLeftType={headerLeftType}
        headerRightType={headerRightType}
        handlePressHeaderLeft={handlePressHeaderLeft}
        handlePressHeaderRight={handlePressHeaderRight}
      />
      <Inner
        bgColor={bgColor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Contents bgColor={bgColor}>{children}</Contents>
      </Inner>
    </Wrapper>
  );
};

export default MainLayout;

const Wrapper = styled(SafeAreaView)`
  width: 100%;
  flex: 1;
  background-color: ${color.COLOR_MAIN};
`;

const Inner = styled.ScrollView`
  width: 100%;
  flex: 1;
  background-color: ${({ bgColor }) => bgColor};
`;

const Contents = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({ bgColor }) => bgColor};
  padding-bottom: 100;
`;
