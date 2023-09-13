// 알림 내역 조회 화면
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import client from "../../config/axios";

import MainLayoutInView from "../../components/common/MainLayoutInView";
import NotificationCard from "../../components/notification/NotificationCard";

const NotificationScreen = () => {
  const [notificationList, setNotificationList] = useState([
    {
      id: 15,
      title: "초대 승인",
      body: "~가 수업 초대를 승인하였습니다.",
      topic: "approve",
      receiverId: 10,
      isRead: "false",
    },
  ]);

  // // 알림 내역 불러오기 함수
  // const fetchNotificationList = async () => {
  //   try {
  //     const result = await client.get(`/api/fcm/push/list`);
  //     console.log(result);
  //     setNotificationList(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotificationList();
  // }, []);

  return (
    <>
      <MainLayoutInView headerText={"알림 내역 조회"} headerLeftType={"back"}>
        <Wrapper>
          <CardList
            data={notificationList}
            renderItem={({ item }) => (
              <NotificationCard id={item.id} title={item.title} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Wrapper>
      </MainLayoutInView>
    </>
  );
};

export default NotificationScreen;

const Wrapper = styled.View`
  width: 100%;
  padding: 10px;
`;
const CardList = styled.FlatList`
  width: 100%;
`;
