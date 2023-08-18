import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5 } from "@expo/vector-icons";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import ReviewList from "../../components/note/ReviewList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import ReviewListBSheet from "./ReviewListBSheet";
import { useIsFocused, useRoute } from "@react-navigation/native";
import client from "../../config/axios";
import Loading from "../../components/common/Loading";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { getReviewList } from "../../redux/actions/reviewListAction";
import useReviewList from "../../hooks/useReviewList";

const ReviewListContainer = ({ children, text }) => {
  const [open, setOpen] = useState(true);

  const onPressHeader = () => {
    setOpen(!open);
  };

  return (
    <>
      <ReviewListWrapper>
        <ReviewListHeader onPress={onPressHeader}>
          <HeaderText>{text}</HeaderText>
          <FontAwesome5
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color={color.COLOR_MAIN}
          />
        </ReviewListHeader>

        {open && <>{children}</>}
      </ReviewListWrapper>
    </>
  );
};

const ReviewListScreen = () => {
  const route = useRoute();
  const { tutoringId } = route.params;

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const reviewList = useReviewList(tutoringId);

  const [selectedList, setSelectedList] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const rbRef = useRef();

  const handleDeleteReviews = () => {
    Alert.alert("복습 목록 삭제", "선택한 복습 목록을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: async () => {
          const reviewIdList = selectedList.map((el) => el.id);

          try {
            const ret = await client.post(`/api/review/multi-delete`, {
              reviewIdList,
            });

            if (ret.status == 200) {
              await getReviewList(tutoringId).then((ret) => dispatch(ret));
              setEditMode(false);
            }
          } catch (err) {
            console.log("delete multiple assignments error: ", err);
          }
        },
      },
    ]);
  };

  const handleRefresh = async () => {
    await getReviewList(tutoringId).then((ret) => dispatch(ret));
  };

  useEffect(() => {
    if (!reviewList) {
      setLoading(true);
    } else {
      let list = [];
      let completed = [];

      for (let i = 0; i < reviewList.length; i++) {
        const isCompleted = reviewList[i].isCompleted;
        if (isCompleted) {
          completed.push(reviewList[i]);
        } else {
          list.push(reviewList[i]);
        }
      }

      setOngoingList(list);
      setCompletedList(completed);

      setLoading(false);
    }
  }, [reviewList]);

  return (
    <>
      <MainLayout
        headerText={"복습 노트"}
        headerLeftType={"back"}
        headerRightType={"setting"}
        handlePressHeaderRight={() => rbRef?.current?.open()}
        handleRefresh={handleRefresh}
      >
        <NoteHeader
          text={"복습 목록"}
          type={"delete"}
          handlePressLeftButton={() => {
            if (reviewList && reviewList.length > 0) {
              setEditMode(!editMode);
            }
          }}
        />

        <Container>
          {loading ? (
            <Loading />
          ) : (
            <>
              <ReviewListContainer text={"진행 중인 복습"}>
                <ReviewList
                  tutoringId={tutoringId}
                  reviewList={ongoingList}
                  editMode={editMode}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                />
              </ReviewListContainer>
              <ReviewListContainer text={"완료된 복습"}>
                <ReviewList
                  tutoringId={tutoringId}
                  reviewList={completedList}
                  editMode={editMode}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                  completed={true}
                />
              </ReviewListContainer>
            </>
          )}
        </Container>
      </MainLayout>

      {editMode && (
        <ConfirmButtons
          cancelText="취소"
          confirmText={"삭제"}
          onCancel={() => {
            setEditMode(false);
          }}
          onConfirm={handleDeleteReviews}
          buttonColor={color.COLOR_RED_TEXT}
        />
      )}

      <ReviewListBSheet rbRef={rbRef} tutoringId={tutoringId} />
    </>
  );
};

export default ReviewListScreen;

const Container = styled.View`
  padding-horizontal: 15;
`;

const ReviewListWrapper = styled.View`
  //   background-color: orange;
  margin-bottom: 50;
`;

const ReviewListHeader = styled.Pressable`
  padding-vertical: 7;
  padding-horizontal: 5;
  border-bottom-width: 2;
  border-color: ${color.COLOR_MAIN};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10;
`;

const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 20;
  color: ${color.COLOR_MAIN};
`;
