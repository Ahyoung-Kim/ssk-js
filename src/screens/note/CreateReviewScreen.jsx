import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useNavigation, useRoute } from "@react-navigation/native";

import { dateFormat } from "../../utils/date";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import TextInputForm from "../../components/inputs/TextInputForm";
import DropDownForm from "../../components/inputs/DropDownForm";
import KeyboardAvoidingLayout from "../../components/common/KeyboardAvoidingLayout";
import BigButton from "../../components/common/BigButton";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import client from "../../config/axios";
import { Alert, TouchableOpacity } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import useReviewTagList from "../../hooks/useReviewTagList";
import { clearClassListInfo } from "../../redux/actions/classListInfoAction";
import {
  clearClassInfo,
  getClassInfo,
} from "../../redux/actions/classInfoAction";
import { getClassNote } from "../../redux/actions/classNoteAction";
import { getReviewList } from "../../redux/actions/reviewListAction";
import { getAssignmentList } from "../../redux/actions/assignmentListAction";

import ReviewTagItem from "../../components/note/ReviewTagItem";
import EmptyMessage from "../../components/common/EmptyMessage";
import { getReviewTagList } from "../../redux/actions/reviewTagListAction";
import { View, ScrollView } from "react-native";

const EachReviewItem = ({ review, onPressXButton }) => {
  const { body, tagId, tag } = review;

  return (
    <>
      <ReviewContainer>
        <ReviewWrapper>
          <FontAwesome5 name="tag" size={14} color={color.COLOR_GRAY_ICON} />

          <TagContainer>
            <TagName>{tag.name}</TagName>
          </TagContainer>

          <ReviewName>{body}</ReviewName>
        </ReviewWrapper>

        <TouchableOpacity onPress={onPressXButton}>
          <Feather name="x" size={18} color={color.COLOR_GRAY_ICON} />
        </TouchableOpacity>
      </ReviewContainer>
    </>
  );
};

const CreateReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // requirement: tutoringId
  const { date, tutoringId, prevStates, prevReview, noteId } = route.params;

  // console.log("prevStates: ", prevStates);
  // console.log("prevReivew: ", prevReview);

  const [reviewList, setReviewList] = useState([]);
  // 복습 내용
  const [body, setBody] = useState("");
  // 태그
  const [tag, setTag] = useState(null);

  const tagList = useReviewTagList(tutoringId);

  const [tagName, setTagName] = useState("");
  const [plusTag, setPlusTag] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const handleCreateTag = async () => {
    try {
      const ret = await client.post("/api/tag", {
        tutoringId,
        tagName,
      });

      if (ret.status == 200) {
        setTagName("");
        setRefetch(true);
      }
    } catch (err) {
      console.log("create tag error: ", err);
    }
  };

  useEffect(() => {
    if (refetch) {
      getReviewTagList(tutoringId).then((ret) => {
        dispatch(ret);
        setRefetch(false);
      });
    }
  }, [refetch]);

  const onPressPlustButton = () => {
    if (!body) {
      Alert.alert("복습 내용을 입력해주세요!");
      return;
    }
    if (!tag) {
      Alert.alert("복습 태그를 선택해주세요!");
      return;
    }

    setReviewList([
      ...reviewList,
      {
        body,
        tagId: tag.id,
        tag,
      },
    ]);

    setBody("");
  };

  const onPressXButton = (idx) => {
    setReviewList(reviewList.filter((_, index) => index !== idx));
  };

  const handleCreateClassNote = async () => {
    const parsedReviewList = reviewList.map((review) => ({
      body: review.body,
      tagId: review.tagId,
    }));
    const body = {
      ...prevStates,
      reviewList: parsedReviewList,
      tutoringId,
    };

    console.log("create body: ", body);

    try {
      const ret = await client.post(`/api/note`, body);

      if (ret.status == 200) {
        // TODO: ret.data 에서 noteId 가져오기
        const noteId = ret.data;

        await getClassNote(noteId).then((ret) => dispatch(ret));
        await getReviewList(tutoringId).then((ret) => dispatch(ret));
        await getAssignmentList(tutoringId).then((ret) => dispatch(ret));
        dispatch(clearClassInfo());
        dispatch(clearClassListInfo());

        Alert.alert("수업 일지가 등록되었습니다!");
        navigation.navigate("ClassNoteScreen", {
          date,
          noteId,
          tutoringId,
        });
      }
    } catch (err) {
      console.log("create class note error: ", err);
    }
  };

  const refetchData = async () => {
    const noteId = prevReview?.noteId;
    if (noteId) {
      await getClassNote(noteId).then((ret) => dispatch(ret));
    }
    await getReviewList(tutoringId).then((ret) => dispatch(ret));
    dispatch(clearClassInfo());
    dispatch(clearClassListInfo());
  };

  const handleCreateReview = async () => {
    if (!body) {
      Alert.alert("복습 내용을 입력해주세요!");
      return;
    }
    if (!tag) {
      Alert.alert("복습 태그를 선택해주세요!");
      return;
    }

    try {
      const data = {
        tutoringId,
        body,
        tagId: tag.id,
        noteId: noteId ? noteId : 0,
      };

      // console.log(data);

      const ret = await client.post("/api/review", data);

      if (ret.status == 200) {
        await refetchData();
        navigation.navigate("ReviewListScreen", {
          tutoringId,
        });
      }
    } catch (err) {
      console.log("create review error: ", err);
    }
  };

  const handleUpdateReview = async () => {
    const { id } = prevReview;

    try {
      const ret = await client.put(`/api/review/${id}`, {
        body,
        tagId: tag.id,
      });

      if (ret.status == 200) {
        await refetchData();
        Alert.alert("복습 노트가 편집되었습니다.");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (err) {
      console.log("update review error: ", err);
    }
  };

  const handleDeleteReview = async () => {
    const { id } = prevReview;

    try {
      const ret = await client.delete(`/api/review/${id}`);

      if (ret.status == 200) {
        await refetchData();
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (err) {
      console.log("delete review error: ", err);
    }
  };

  const onDelete = () => {
    Alert.alert("복습 노트 삭제", "해당 복습 노트를 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: handleDeleteReview,
      },
    ]);
  };

  useEffect(() => {
    if (prevReview) {
      setBody(prevReview.body);
      setTag({
        id: prevReview.tagId,
        name: prevReview.tagName,
      });
    }
  }, [prevReview]);

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        headerText={"복습 노트 작성"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader
          type="basic"
          text={
            date
              ? dateFormat(date)
              : prevReview
              ? "복습 노트 편집"
              : "복습 노트 추가"
          }
        />

        <TextInputForm
          label="복습 내용"
          value={body}
          onChangeText={setBody}
          placeholder={"복습 내용을 입력하세요."}
        />
        
        <View>
          <ScrollView style={{ marginBottom: 200 }}>
            <View style={{ zIndex: 100, elevation: 3}}>
            <DropDownForm
              label="복습 태그"
              placeholder={"복습 태그를 선택하세요."}
              list={tagList ? tagList : []}
              textKey={"name"}
              onPressItem={(item) => {
                // console.log(item);
                setTag(item);
              }}
              menuHeight={450}
              
              dropDownDirection="TOP"
              initialItem={
                prevReview
                  ? {
                      id: prevReview.tagId,
                      name: prevReview.tagName,
                    }
                  : null
              }
            />
            </View>
            <TextInputForm
                label="태그 추가"
                placeholder={"복습 태그 이름을 입력하세요."}
                value={tagName}
                onChangeText={setTagName}
                button={"입력"}
                handleButtonPress={handleCreateTag}
              />


            {prevStates && (
              <Container>
                <PlusButton onPress={onPressPlustButton}>
                  <FontAwesome5
                    name="plus"
                    size={16}
                    color={color.COLOR_GRAY_ICON}
                  />
                </PlusButton>

                {reviewList.length > 0 && (
                  <ReviewList>
                    {reviewList.map((review, idx) => (
                      <EachReviewItem
                        key={`review_${review.body}`}
                        review={review}
                        onPressXButton={onPressXButton.bind(this, idx)}
                      />
                    ))}
                  </ReviewList>
                )}
              </Container>
            )}
            <NoteHeader
          text={"태그 관리"}
          
        />
            <Contents>
              {tagList && tagList.length > 0 ? (
                <TagList>
                  {tagList.map((tag) => (
                    <ReviewTagItem
                      key={`${tag.name}_${tag.id}`}
                      tag={tag}
                      setRefetch={setRefetch}
                    />
                  ))}
                </TagList>
              ) : (
                <EmptyMessage message={"태그 목록이 없습니다."} />
              )}
            </Contents>
            
          </ScrollView>
        </View>
      </MainLayout>

      {prevStates ? (
        <BigButton onPress={handleCreateClassNote} text="수업 일지 생성" />
      ) : prevReview ? (
        <>
          <ConfirmButtons
            cancelText="삭제"
            confirmText={"편집"}
            filled={true}
            cancelButtonColor={color.COLOR_RED_TEXT}
            buttonColor={color.COLOR_MAIN}
            onCancel={onDelete}
            onConfirm={handleUpdateReview}
          />
        </>
      ) : (
        <BigButton onPress={handleCreateReview} text="복습 노트 추가" />
      )}
    </KeyboardAvoidingLayout>
  );
};

export default CreateReviewScreen;

const Container = styled.View`
  padding-horizontal: 15;
`;

const PlusButton = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  border-width: 2;
  border-color: ${color.COLOR_GRAY_ICON};
  border-radius: 100px;
  width: 30;
  height: 30;
  margin-vertical: 20;
`;

const ReviewList = styled.View``;

const ReviewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10;
`;

const ReviewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TagContainer = styled.View`
  margin-horizontal: 7;
  padding-horizontal: 8;
  padding-vertical: 4;
  border-radius: 5px;
  background-color: rgba(12, 155, 251, 0.2);
`;

const TagName = styled.Text``;

const ReviewName = styled.Text`
  font-weight: bold;
  font-size: 16;
`;

const Contents = styled.View`
  padding-horizontal: 15;
  margin-vertical: 10;
`;

const TagList = styled.View``;

const EmptyText = styled.Text`
  font-weight: bold;
  font-size: 16;
  color: ${color.COLOR_GRAY_TEXT};
  text-align: center;
  padding-vertical: 30;
`;
