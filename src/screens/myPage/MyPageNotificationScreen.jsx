import React, { useState, useEffect } from "react";

import MainLayout from "../../components/common/MainLayout";
import NotificationButton from "../../components/myPage/NotificationButton";
import client from "../../config/axios";
import GetPushState from "./GetPushState";

const MyPageNotificationScreen = () => {
  const [isPushAccepted, setIsPushAccepted] = useState(true);
  useEffect(() => {
    async function getPushState() {
      const isAlarmOn = await GetPushState();
      setIsPushAccepted(isAlarmOn);
    }
    getPushState();
  }
  );
  return (
    <MainLayout headerText={"푸시 알림"} headerLeftType={"back"}>
      <NotificationButton
        type="PUSH"
        isAccepted={isPushAccepted}
        setIsAccepted={setIsPushAccepted}
      />
    </MainLayout>
  );
};

export default MyPageNotificationScreen;
