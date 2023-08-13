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
import client from "../../config/axios";
import { Alert, TouchableOpacity } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

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
  const { date, tutoringId, prevStates } = route.params;

  // console.log("prevStates: ", prevStates);
  const [reviewList, setReviewList] = useState([]);
  // 복습 내용
  const [body, setBody] = useState("");
  // 태그
  const [tag, setTag] = useState(null);

  const [tagList, setTagList] = useState([]);

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

    // console.log("create body: ", body);

    try {
      const ret = await client.post(`/api/note`, body);

      if (ret.status == 200) {
        // TODO: ret.data 에서 noteId 가져오기
        const noteId = ret.data;
        // Alert.alert("수업 일지가 등록되었습니다!");
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
      };

      // console.log(data);

      const ret = await client.post("/api/review", data);

      if (ret.status == 200) {
        navigation.navigate("ReviewListScreen", {
          tutoringId,
        });
      }
    } catch (err) {
      console.log("create review error: ", err);
    }
  };

  const getTagList = async () => {
    try {
      const ret = await client.post("/api/tag/list", {
        tutoringId,
      });

      if (ret.status == 200) {
        // console.log(ret.data);
        setTagList(ret.data.tagList);
      }
    } catch (err) {
      console.log("get tag list error: ", err);
      const status = err?.response?.status;

      if (status == 404) {
        setTagList([]);
      }
    }
  };

  useEffect(() => {
    getTagList();
  }, []);

  return (
    <KeyboardAvoidingLayout>
      <MainLayout
        headerText={"복습 노트 작성"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader
          type="basic"
          text={date ? dateFormat(date) : "복습 노트 추가"}
        />

        <TextInputForm
          label="복습 내용"
          value={body}
          onChangeText={setBody}
          placeholder={"복습 내용을 입력하세요."}
        />

        <DropDownForm
          label="복습 태그"
          placeholder={"복습 태그를 선택하세요."}
          list={tagList}
          textKey={"name"}
          onPressItem={(item) => {
            // console.log(item);
            setTag(item);
          }}
          menuHeight={150}
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
      </MainLayout>

      {prevStates ? (
        <BigButton onPress={handleCreateClassNote} text="수업 일지 생성" />
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
  border-radius: 100;
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
  border-radius: 5;
  background-color: rgba(12, 155, 251, 0.2);
`;

const TagName = styled.Text``;

const ReviewName = styled.Text`
  font-weight: bold;
  font-size: 16;
`;
