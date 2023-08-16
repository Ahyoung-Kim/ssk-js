import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ReviewNameWithTag from "./ReviewNameWithTag";
import useIsTutor from "../../hooks/useIsTutor";
import { useNavigation } from "@react-navigation/core";
import client from "../../config/axios";

const ReviewItem = ({
  data,
  editMode,
  onPressItem = () => {},
  completed,
  tutoringId,
}) => {
  const { body, id, isCompleted, noteId, tagId, tagName } = data;

  const navigation = useNavigation();
  const isTutor = useIsTutor();

  const [click, setClick] = useState(isCompleted);
  const [selected, setSelected] = useState(false);

  const handleCheck = async (isCompleted) => {
    try {
      const body = {
        isCompleted,
      };

      // console.log(body);
      const ret = await client.post(`/api/review/${id}/check`, body);

      if (ret.status == 200) {
        console.log("success");
      }
    } catch (err) {
      console.log("check review item error: ", err);
    }
  };

  const onPressClickBox = () => {
    if (!completed) {
      const _click = !click;
      setClick(_click);
      handleCheck(_click);
    }
  };

  const onPressContainer = () => {
    if (isTutor) {
      if (!editMode) {
        navigation.navigate("CreateReviewScreen", {
          tutoringId,
          prevReview: data,
        });
      } else {
        setSelected(!selected);
        onPressItem(data);
      }
    }
  };

  return (
    <>
      <Container onPress={onPressContainer} activeOpacity={isTutor ? 0.5 : 1}>
        <Wraaper>
          <ReviewNameWithTag tagId={tagId} body={body} tagName={tagName} />

          {editMode && <EditWrapper />}
        </Wraaper>

        {isTutor ? (
          <>
            {editMode ? (
              <Ionicons
                name={
                  selected ? "checkmark-circle" : "checkmark-circle-outline"
                }
                color={color.COLOR_RED_TEXT}
                size={20}
              />
            ) : (
              <FontAwesome5
                name="angle-right"
                size={22}
                color={color.COLOR_GRAY_ICON}
              />
            )}
          </>
        ) : (
          <CheckBox onPress={onPressClickBox}>
            <Ionicons
              name={click ? "checkbox" : "checkbox-outline"}
              color={color.COLOR_MAIN}
              size={20}
              style={completed ? { opacity: 0 } : {}}
            />
          </CheckBox>
        )}
      </Container>
    </>
  );
};

export default ReviewItem;

const Container = styled.TouchableOpacity`
  //   background-color: orange;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 7;
  padding-horizontal: 5;
  border-bottom-width: 1;
  border-color: ${color.COLOR_GRAY_BORDER};
`;

const Wraaper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditWrapper = styled.View`
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const CheckBox = styled.Pressable``;
