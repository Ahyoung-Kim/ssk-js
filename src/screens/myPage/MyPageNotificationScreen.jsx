import React, { useState, useEffect } from "react";

import MainLayout from "../../components/common/MainLayout";
import NotificationButton from "../../components/myPage/NotificationButton";

const MyPageNotificationScreen = () => {
  const [isPushAccepted, setIsPushAccepted] = useState(true);
  const [isAppAccepted, setIsAppAccepted] = useState(false);

  return (
    <MainLayout headerText={"푸시 알림"} headerLeftType={"back"}>
      <NotificationButton
        type="PUSH"
        isAccepted={isPushAccepted}
        setIsAccepted={setIsPushAccepted}
      />
      <NotificationButton
        type="APP"
        isAccepted={isAppAccepted}
        setIsAccepted={setIsAppAccepted}
      />
    </MainLayout>
  );
};

export default MyPageNotificationScreen;
