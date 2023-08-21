import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { Ionicons } from "@expo/vector-icons";

import SignUpPageContainer from "../../components/signUp/SignUpPageContainer";
import { dh } from "../../common/windowSize";
import { View } from "react-native";

const AgreementItem = ({ text, required, setAgreement }) => {
  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);

  const onPressCheck = () => {
    const _check = !check;
    if (required) {
      setAgreement(_check);
    }
    setCheck(_check);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Container>
        <Wrapper>
          <TouchableArea onPress={onPressCheck}>
            <Ionicons
              name={check ? "checkmark-circle" : "checkmark-circle-outline"}
              color={color.COLOR_MAIN}
              size={24}
            />
          </TouchableArea>

          <Text>{text}</Text>

          <RequiredText required={required}>{`(${
            required ? "필수" : "선택"
          })`}</RequiredText>
        </Wrapper>

        <TouchableArea onPress={() => setOpen(!open)}>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            color={color.COLOR_GRAY_ICON}
            size={22}
          />
        </TouchableArea>
      </Container>

      {open && (
        <DescriptionWrapper showsVerticalScrollIndicator={true}>
          <DescriptionText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            gravida libero eget purus elementum vehicula. Sed arcu enim, blandit
            quis tincidunt vitae, commodo non sem. Fusce vestibulum nec metus
            tincidunt tincidunt. Ut dignissim varius lectus ac venenatis. Donec
            mauris nisl, vehicula in mauris vel, euismod maximus diam. Aliquam
            rhoncus facilisis ex, a fermentum diam dignissim vitae. Aliquam
            consequat consequat tempor. Nulla rhoncus, libero sit amet accumsan
            venenatis, libero neque accumsan eros, vel feugiat risus enim sed
            elit. Nullam eros neque, consectetur nec ligula id, auctor feugiat
            lectus. Fusce nec laoreet felis. Vivamus in ullamcorper ante.
            Phasellus pulvinar vitae dui vitae elementum. Nullam tempus quis mi
            vitae laoreet. Cras accumsan magna convallis porta accumsan. Aliquam
            dapibus tincidunt velit. Integer dapibus, odio nec hendrerit cursus,
            nunc urna aliquet eros, et gravida odio sem non nunc. Aliquam erat
            volutpat. Etiam placerat vel orci in placerat. Quisque sit amet
            tellus aliquam, laoreet sapien et, fringilla justo
          </DescriptionText>
        </DescriptionWrapper>
      )}
    </View>
  );
};

const AgreementPage = ({ agreement, setAgreement }) => {
  return (
    <SignUpPageContainer text={"3. 이용약관 동의"}>
      <AgreementItem
        text="개인 정보 수집 및 이용 안내"
        required={true}
        setAgreement={setAgreement}
      />
      <AgreementItem
        text="제 3자 제공 동의"
        required={true}
        setAgreement={setAgreement}
      />
      <AgreementItem text="제 3자 제공 동의" required={false} />
    </SignUpPageContainer>
  );
};

export default AgreementPage;

const Container = styled.View`
  //   background-color: orange;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 7;
  border-bottom-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TouchableArea = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 18;
  margin-horizontal: 7;
`;

const RequiredText = styled.Text`
  color: ${({ required }) =>
    required ? color.COLOR_MAIN : color.COLOR_GRAY_TEXT};
`;

const DescriptionWrapper = styled.ScrollView`
  width: 100%;
  height: ${dh * 0.4};
  border-radius: 5;
  border-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
  flex-shrink: 1;
  margin-top: 5;
  //   padding-vertical: 5;
  //   padding-horizontal: 10;
`;

const DescriptionText = styled.Text`
  flex-shrink: 1;
  font-size: 16;
  line-height: 32;
  padding-horizontal: 15;
  padding-vertical: 5;
`;
