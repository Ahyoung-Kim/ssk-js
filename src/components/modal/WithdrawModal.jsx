import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ModalContainer from "./ModalContainer";
import Loading from "../common/Loading";

import client from "../../config/axios";

import { useDispatch } from "react-redux";
import { getClassList } from "../../redux/actions/classListAction";
import ModalConfirmButtons from "./ModalConfirmButtons";
import { useNavigation } from "@react-navigation/native";

const WithdrawModal = ({
  classInfoRef,
  tutoringId,
  modalVisible,
  setModalVisible,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleWithdraw = async () => {
    try {
      const ret = await client.delete(`/api/tutoring/${tutoringId}/withdraw`);

      if (ret.status == 200) {
        getClassList()
          .then((res) => {
            dispatch(res);
            classInfoRef?.current?.close();
            setModalVisible(false);
          })
          .then(() => {
            navigation.navigate("ClassListScreen");
          });
      }
    } catch (err) {
      console.log("withdraw class error: ", err);
    }
  };

  return (
    <>
      <ModalContainer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <HeaderText>수업 나가기</HeaderText>

        <DescriptionText>
          수업에서 나가게 되면,{"\n"} 해당 수업 정보를 조회할 수 없습니다.
        </DescriptionText>

        <ConfirmText>정말 수업에서 나가시겠습니까?</ConfirmText>

        <ModalConfirmButtons
          confirmText={"확인"}
          buttonColor={color.COLOR_RED_TEXT}
          onCancel={() => setModalVisible(false)}
          onConfirm={handleWithdraw}
        />
      </ModalContainer>
    </>
  );
};

export default WithdrawModal;

const HeaderText = styled.Text`
  color: ${color.COLOR_RED_TEXT};
  font-weight: bold;
  text-align: center;
  font-size: 20;
`;

const DescriptionText = styled.Text`
  font-size: 16;
  color: ${color.COLOR_GRAY_TEXT};
  text-align: center;
  margin-vertical: 30;
`;

const ConfirmText = styled.Text`
  font-size: 18;
  font-weight: bold;
  text-align: center;
`;
