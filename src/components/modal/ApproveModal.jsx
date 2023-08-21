import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ModalContainer from "./ModalContainer";
import Loading from "../common/Loading";

import client from "../../config/axios";

import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";
import { clearClassListInfo } from "../../redux/actions/classListInfoAction";

const ApproveModal = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const approveInvitation = async () => {
    setLoading(true);

    try {
      const ret = await client.post("/api/tutoring/invite/approve", {
        invitationCode: inviteCode,
      });

      if (ret.status == 200) {
        setModalVisible(false);
        setInviteCode("");
        dispatch(clearClassListInfo());
        await getClassList().then((ret) => {
          dispatch(ret);
        });
      }
    } catch (err) {
      console.log("Approve invitation error: ", err);
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
          초대 코드를 입력하여 수업에 참여하세요!
        </DescriptionText>

        <InviteCodeWrapper>
          {loading ? (
            <Loading size={50} padding={0} />
          ) : (
            <InviteCode
              multiline={true}
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="초대 코드를 입력하세요"
            />
          )}
        </InviteCodeWrapper>

        <InviteButton
          loading={loading}
          activeOpacity={0.5}
          onPress={loading ? null : approveInvitation}
        >
          <ButtonText>수업 참여하기</ButtonText>
        </InviteButton>
      </ModalContainer>
    </>
  );
};

export default ApproveModal;

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
`;

const InviteButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ loading }) =>
    loading ? color.COLOR_DARKGRAY_BACKGROUND : color.COLOR_MAIN};
  border-radius: 5px;
  height: 40;
  justify-content: center;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 16;
  text-align: center;
`;
