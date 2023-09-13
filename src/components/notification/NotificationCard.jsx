import React from "react";
import styled from "styled-components/native";

import color from "../../common/color";

const NotificationCard = ({ id }) => {
  return (
    <>
      <CardWrapper>
        <CardHeader>
          <HeaderTitle>{id}</HeaderTitle>
        </CardHeader>
        <BodyText>하이</BodyText>
      </CardWrapper>
    </>
  );
};

export default NotificationCard;

const CardWrapper = styled.View`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  elevation: 5;
`;

const CardHeader = styled.View`
  width: 100%;
  background-color: ${color.COLOR_MAIN};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;

const HeaderTitle = styled.Text`
  color: ${color.COLOR_WHITE_BACKGROUND};
`;

const BodyText = styled.Text``;
