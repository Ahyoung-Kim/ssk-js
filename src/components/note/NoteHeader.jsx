import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5, Entypo, Ionicons, Feather } from "@expo/vector-icons";

// type: basic, date, setting, pen, settingAndPen
const NoteHeader = ({
  type = "basic",
  text,
  handlePressLeftButton = () => {},
  handlePressRightButton = () => {},
}) => {
  const iconSize = 18;
  const iconColor = color.COLOR_GRAY_ICON;

  const Component = ({ children }) => {
    switch (type) {
      case "basic":
        return (
          <>
            <NonTouchableArea />
            {children}
            <NonTouchableArea />
          </>
        );
      case "date":
        return (
          <>
            <TouchableArea onPress={handlePressLeftButton}>
              <FontAwesome5
                name="angle-left"
                size={22}
                color={color.COLOR_MAIN}
              />
            </TouchableArea>
            {children}
            <TouchableArea onPress={handlePressRightButton}>
              <FontAwesome5
                name="angle-right"
                size={22}
                color={color.COLOR_MAIN}
              />
            </TouchableArea>
          </>
        );
      case "setting":
        return (
          <>
            <TouchableArea onPress={handlePressLeftButton}>
              <FontAwesome5 name="cog" size={iconSize} color={iconColor} />
            </TouchableArea>
            {children}
            <NonTouchableArea />
          </>
        );
      case "write":
        return (
          <>
            <NonTouchableArea />
            {children}
            <TouchableArea onPress={handlePressRightButton}>
              <FontAwesome5 name="edit" size={iconSize} color={iconColor} />
            </TouchableArea>
          </>
        );
      case "settingAndWrite":
        return (
          <>
            <TouchableArea onPress={handlePressLeftButton}>
              <FontAwesome5 name="cog" size={iconSize} color={iconColor} />
            </TouchableArea>
            {children}
            <TouchableArea onPress={handlePressRightButton}>
              <FontAwesome5 name="edit" size={iconSize} color={iconColor} />
            </TouchableArea>
          </>
        );
      case "delete":
        return (
          <>
            <TouchableArea onPress={handlePressLeftButton}>
              <FontAwesome5
                name="trash-alt"
                size={iconSize}
                color={iconColor}
              />
            </TouchableArea>
            {children}
            <NonTouchableArea />
          </>
        );
      case "deleteAndWrite":
        return (
          <>
            <TouchableArea onPress={handlePressLeftButton}>
              <FontAwesome5
                name="trash-alt"
                size={iconSize}
                color={iconColor}
              />
            </TouchableArea>
            {children}
            <TouchableArea onPress={handlePressRightButton}>
              <FontAwesome5 name="edit" size={iconSize} color={iconColor} />
            </TouchableArea>
          </>
        );
      case "plus":
        return (
          <>
            <NonTouchableArea />
            {children}
            <TouchableArea onPress={handlePressRightButton}>
              <Feather name="plus-circle" size={22} color={iconColor} />
            </TouchableArea>
          </>
        );
      default:
        return (
          <>
            <NonTouchableArea />
            {children}
            <NonTouchableArea />
          </>
        );
    }
  };

  return (
    <>
      <Container>
        <Component>
          <HeaderText>{text}</HeaderText>
        </Component>
      </Container>
    </>
  );
};

export default NoteHeader;

const Container = styled.View`
  //   background-color: orange;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 5;
`;

const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 22;
  color: ${color.COLOR_MAIN};
`;

const TouchableArea = styled.TouchableOpacity`
  //   background-color: aqua;
  width: 50;
  height: 50;
  align-items: center;
  justify-content: center;
`;

const NonTouchableArea = styled.View`
  width: 50;
  height: 50;
`;
