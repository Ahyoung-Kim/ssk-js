import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ModalContainer from "./ModalContainer";

import client from "../../config/axios";
import Loading from "../common/Loading";

const InviteCodeModal = ({ modalVisible, setModalVisible, tutoringId }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const getInviteCode = async () => {
    setLoading(true);

    try {
      const ret = await client.post(`/api/tutoring/${tutoringId}/invite/tutee`);
      // console.log(ret.status);
      if (ret.status == 200) {
        console.log(ret.data);
        setInviteCode(ret.data.invitationCode);
      }
    } catch (err) {
      console.log("Invite code error: ", err);
      console.log(err?.response?.status);

      const status = err?.response?.status;

      if (status >= 500) {
        setInviteCode(`${status} 서버 에러`);
      } else if (status === 404) {
        setInviteCode("404 Not found");
      } else if (status === 409) {
        setInviteCode("409 Conflict: ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalContainer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <DescriptionText>
          초대 코드를 발급하여 학생을 초대하세요!
        </DescriptionText>

        <InviteCodeWrapper>
          {loading ? (
            <Loading size={50} padding={0} />
          ) : (
            <InviteCode
              editable={false}
              multiline={true}
              value={inviteCode ? inviteCode : "초대 코드"}
            />
          )}
        </InviteCodeWrapper>

        <InviteButton
          loading={loading}
          activeOpacity={0.5}
          onPress={loading ? null : getInviteCode}
        >
          <ButtonText>
            {inviteCode ? "초대 코드 재발급" : "초대 코드 발급"}
          </ButtonText>
        </InviteButton>
      </ModalContainer>
    </>
  );
};

export default InviteCodeModal;

const DescriptionText = styled.Text`
  font-size: 12;
  color: ${color.COLOR_GRAY_TEXT};
  text-align: center;
`;

const InviteCodeWrapper = styled.View`
  width: 100%;
  height: 120;
  justify-content: center;
  align-items: center;
`;

const InviteCode = styled.TextInput`
  //   background-color: orange;
  width: 100%;
  text-align: center;
  font-size: 24;
  font-weight: bold;
  color: ${({ inviteCode }) => (inviteCode ? "#000" : color.COLOR_GRAY_TEXT)};
`;

const InviteButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ loading }) =>
    loading ? color.COLOR_DARKGRAY_BACKGROUND : color.COLOR_MAIN};
  border-radius: 5;
  height: 40;
  justify-content: center;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 16;
  text-align: center;
`;
