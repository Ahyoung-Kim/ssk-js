import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Platform, View } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const ClassInfoBoxContainer = ({
  children,
  name,
  onPressMoreButton = () => {},
}) => {
  return (
    <>
      <Container
        style={{
          ...Platform.select({
            ios: {
              shadowColor: color.COLOR_BOX_SHADOW,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowRadius: 3,
              shadowOpacity: 0.25,
            },
            android: {
              elevation: 3,
            },
          }),
        }}
      >
        <NameView>
          <View style={{ flex: 1 }} />
          <NameText style={{ flex: 1 }}>{name}</NameText>

          <MoreButton style={{ flex: 1 }} onPress={onPressMoreButton}>
            <MoreText>더보기</MoreText>
            <Feather
              name="chevron-right"
              color={color.COLOR_GRAY_ICON}
              size={16}
            />
          </MoreButton>
        </NameView>

        <Contents>{children}</Contents>
      </Container>
    </>
  );
};

export default ClassInfoBoxContainer;

const Container = styled.View`
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  border-radius: 7;
  border-color: ${color.COLOR_MAIN};
  border-width: 1;
  padding-vertical: 15;
  padding-horizontal: 20;
  margin-bottom: 15;
`;

const NameView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  //   background-color: orange;
  margin-bottom: 10;
`;

const NameText = styled.Text`
  font-weight: bold;
  font-size: 22;
  color: ${color.COLOR_MAIN};
  text-align: center;
`;

const MoreButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  //   background-color: orange;
  justify-content: flex-end;
`;

const MoreText = styled.Text`
  color: ${color.COLOR_GRAY_ICON};
  margin-right: 3;
`;

const Contents = styled.View``;
