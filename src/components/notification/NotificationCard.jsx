import React from "react";
import styled from "styled-components/native";

import color from "../../common/color";

const NotificationCard = ({ title, body, read }) => {
  return (
    <>
      <CardWrapper>
        <CardHeader>
          {!read && <Flag>new  </Flag>}
          <HeaderTitle>{title}</HeaderTitle>
        </CardHeader>
        <BodyText>{body}</BodyText>
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
  margin-bottom: 10px;
  /* border: 1px solid black; */
  border-radius: 10px;
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

const Flag = styled.Text`
  color: ${color.COLOR_RED_TEXT};
`

const HeaderTitle = styled.Text`
  color: ${color.COLOR_WHITE_BACKGROUND};
`;

const BodyText = styled.Text``;
