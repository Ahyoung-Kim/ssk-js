import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import MainLayout from "../../components/common/MainLayout";

const MyPageAgreementScreen = () => {
  const openPrivacyPolicy = () => {
    const url = "https://susukgwan.com/privacy-policy";
    Linking.openURL(url);
  };

  return (
    <MainLayout headerText={"개인정보처리방침"} headerLeftType={"back"}>
      <TouchableOpacity onPress={openPrivacyPolicy}>
        <Text style={{ color: "blue" }}>수숙관 개인정보처리방침</Text>
      </TouchableOpacity>
    </MainLayout>
  );
};

export default MyPageAgreementScreen;
