import React from "react";
import styled from "styled-components/native";

import color from "../../common/color";

const NotificationCard = ({ id }) => {
  return (
    <>
      <CardWrapper>
        <CardHeader>
          <HeaderTitle>{`ID: ${id}`}</HeaderTitle>
        </CardHeader>
        <BodyText>하이</BodyText>
      </CardWrapper>
    </>
  );
};

export default NotificationCard;

const CardWrapper = styled.View`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  border-radius: 12px;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
`;

const CardHeader = styled.View``;

const HeaderTitle = styled.Text``;

const BodyText = styled.Text``;
