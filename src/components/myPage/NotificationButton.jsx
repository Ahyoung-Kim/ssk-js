import React from "react";
import styled from "styled-components/native";

import color from "../../common/color";
import SetPushState from "../../screens/myPage/SetPushState";

const NotificationButton = ({ type, isAccepted, setIsAccepted }) => {

  const handleButton = () => {
    async function setPushState(isAccepted) {
      await SetPushState(isAccepted);
    }
    setPushState(isAccepted);
    setIsAccepted(!isAccepted);
  }

  let component;
  switch (type) {
    case "PUSH":
      component =(<>
        <ButtonText>푸시 알림 허용</ButtonText>
        {isAccepted ? <ToggleButtonImage source={require("../../assets/images/toggleOn.png")}/> : 
        <ToggleButtonImage source={require("../../assets/images/toggleOff.png")}/> }
      </>)
      break;
    default:
      break;
  }

  return (
    <ButtonContainer onPress={handleButton}>
      {component}
    </ButtonContainer>
  );
};

export default NotificationButton;

// styled
const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px 11px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${color.COLOR_MAIN}
`;

const ButtonText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-size: 16px;
  font-family: "Bold";
  line-height: 18px;
`;

const ToggleButtonImage = styled.Image`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;