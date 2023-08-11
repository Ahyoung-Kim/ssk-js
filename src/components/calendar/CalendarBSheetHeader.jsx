import React from "react";

import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { dateFormat } from "../../utils/date";
import color from "../../common/color";

const CalendarBSheetHeader = ({ date, edit, handlePressEdit = () => {} }) => {
  return (
    <Header>
      <HeaderText>{dateFormat(date)}</HeaderText>

      {edit && (
        <EditButton onPress={handlePressEdit}>
          <FontAwesome5 name="cog" size={18} color={color.COLOR_GRAY_ICON} />
        </EditButton>
      )}
    </Header>
  );
};

export default CalendarBSheetHeader;

const Header = styled.View`
  padding-vertical: 5;
  border-bottom-width: 1;
  border-color: ${color.COLOR_MAIN};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10;
`;

const HeaderText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-weight: bold;
  font-size: 22;
`;

const EditButton = styled.TouchableOpacity``;
