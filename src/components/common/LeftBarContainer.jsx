import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";

const LeftBarContainer = ({
  children,
  label,
  width = "100%",
  onPress = () => {},
  onLabelPress = () => {},
  navigate = false,
  rightIconComponent = null,
}) => {
  return (
    <>
      <Container width={width} onPress={onPress}>
        <LabelContainer margin={children ? true : false}>
          <Label onPress={onLabelPress}>
            <LabelText>{label}</LabelText>

            {navigate && (
              <FontAwesome5
                name="angle-right"
                color={color.COLOR_MAIN}
                size={16}
              />
            )}
          </Label>

          {rightIconComponent && <RightIcon>{rightIconComponent}</RightIcon>}
        </LabelContainer>

        {children}
      </Container>
    </>
  );
};

export default LeftBarContainer;

const Container = styled.Pressable`
  width: ${({ width }) => width};
  border-left-width: 4;
  border-color: ${color.COLOR_MAIN};
  padding-horizontal: 10;
  margin-vertical: 7;
`;

const LabelContainer = styled.View`
  // background-color: orange;
  margin-bottom: ${({ margin }) => (margin ? 7 : 0)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-weight: bold;
  font-size: 16;
  margin-right: 7;
`;

const RightIcon = styled.TouchableOpacity`
  // background-color: orange;
`;
