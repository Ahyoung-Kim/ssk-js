import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { dw } from "../../common/windowSize";

import { FlatList } from "react-native";

const FeedCarousel = ({ data, itemWidth = dw, itemHeight = dw }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const onScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / dw);
    //   console.log(index);
    if (index !== pageIndex) {
      setPageIndex(index);
    }
  };

  return (
    <>
      <Container width={itemWidth} height={itemHeight}>
        <FlatList
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(176, 176, 176, 0.5)",
          }}
          keyExtractor={(item, index) => `carousel_${index}`}
          data={data}
          renderItem={({ item }) => <HwImage source={{ uri: item }} />}
          horizontal
          pagingEnabled
          initialScrollIndex={0}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        />

        {data && data.length > 1 && (
          <IndicatorWrapper>
            {data.map((_, index) => (
              <Indicator focused={index === pageIndex} />
            ))}
          </IndicatorWrapper>
        )}
      </Container>
    </>
  );
};

export default FeedCarousel;

const Container = styled.View`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
`;

const IndicatorWrapper = styled.View`
  //   background-color: orange;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 15;
`;

const Indicator = styled.View`
  width: 10;
  height: 10;
  margin-horizontal: 5;
  border-radius: 100;
  background-color: ${({ focused }) =>
    focused ? color.COLOR_MAIN : "rgba(176, 176, 176, 0.5)"};
`;

const HwImage = styled.Image`
  width: ${dw};
  height: ${dw};
  resize-mode: contain;
  overflow: hidden;
`;
