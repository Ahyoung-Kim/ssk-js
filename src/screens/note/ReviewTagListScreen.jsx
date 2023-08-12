import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import MainLayout from "../../components/common/MainLayout";
import { useRoute } from "@react-navigation/native";
import NoteHeader from "../../components/note/NoteHeader";
import TextInputForm from "../../components/inputs/TextInputForm";
import ReviewTagItem from "../../components/note/ReviewTagItem";
import client from "../../config/axios";

const ReviewTagListScreen = () => {
  const route = useRoute();
  const { tutoringId } = route.params;

  const [tagName, setTagName] = useState("");
  const [tagList, setTagList] = useState([]);

  const [plusTag, setPlusTag] = useState(false);
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

  useEffect(() => {
    if (refetch) {
      getTagList();
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <>
      <MainLayout
        headerText={"복습 태그 관리"}
        headerLeftType={"back"}
        bgColor="white"
      >
        <NoteHeader
          text={"복습 태그"}
          type="plus"
          handlePressRightButton={() => {
            setPlusTag(!plusTag);
          }}
        />

        {plusTag && (
          <TextInputForm
            label="태그 추가"
            placeholder={"복습 태그 이름을 입력하세요."}
            value={tagName}
            onChangeText={setTagName}
            button={"입력"}
            handleButtonPress={handleCreateTag}
          />
        )}

        <Contents>
          {tagList.length > 0 ? (
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
            <EmptyText>태그 목록이 없습니다.</EmptyText>
          )}
        </Contents>
      </MainLayout>
    </>
  );
};

export default ReviewTagListScreen;

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
