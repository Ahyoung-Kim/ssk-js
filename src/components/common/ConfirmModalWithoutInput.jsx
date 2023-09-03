import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const ConfirmModal = ({
  modalText,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  isVisible,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            width: 300,
            elevation: 5,
          }}
        >
          <Text>{modalText}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={onCancel}>
              <Text>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
