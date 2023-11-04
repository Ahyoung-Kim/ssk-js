// 알림 내역 조회 화면
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import client from "../../config/axios";

import MainLayoutInView from "../../components/common/MainLayoutInView";
import NotificationCard from "../../components/notification/NotificationCard";
import FetchNotifications from "./FetchNotifications";
import ReadNotifications from "./ReadNotifications";

const NotificationScreen = () => {
  const [fetchedNotifications, setFetchedNotifications] = useState([]);

  useEffect(() => {
    async function getNotifications() {
      const notifications = await FetchNotifications();
      setFetchedNotifications(notifications);
    }
    getNotifications();
    async function readAllNotifications() {
      await ReadNotifications();
    }
    readAllNotifications();
  }, []);
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
            data={fetchedNotifications}
            renderItem={({ item }) => (
              <NotificationCard id={item.id} title={item.title} read={item.read} />
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
