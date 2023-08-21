import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import Modal from "react-native-modal";

const ModalContainer = ({ modalVisible, setModalVisible, children }) => {
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Modal
        transparent={true}
        isVisible={modalVisible}
        backdropOpacity={0.3}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}
        avoidKeyboard={true}
      >
        <Contents>{children}</Contents>
      </Modal>
    </>
  );
};

export default ModalContainer;

const Contents = styled.View`
  padding: 20px;
  border-radius: 8;
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  justify-content: center;
`;
