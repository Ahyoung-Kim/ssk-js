import React, { useRef } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { useRoute, useNavigation } from "@react-navigation/native";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import { dateFormat } from "../../utils/date";
import LeftBarContainer from "../../components/common/LeftBarContainer";
import { FontAwesome5 } from "@expo/vector-icons";
import useIsTutor from "../../hooks/useIsTutor";
import CircleIconButton from "../../components/common/CircleIconButton";
import CreateNoteBSheet from "../../components/note/CreateNoteBSheet";

const SettingIcon = ({ onPress }) => {
  return (
    <FontAwesome5
      onPress={onPress}
      name="cog"
      color={color.COLOR_GRAY_ICON}
      size={16}
    />
  );
};

const ClassNoteScreen = () => {
  const route = useRoute();
  const { date, noteId } = route.params; // noteId 필요

  const isTutor = useIsTutor();

  const rbRef = useRef();

  return (
    <>
      <MainLayout
        bgColor={color.COLOR_WHITE_BACKGROUND}
        headerText={"수업 일지"}
        headerType={"back"}
      >
        <NoteHeader text={dateFormat(date)} type="date" />

        <Contents>
          <LeftBarContainer label={"진도 보고"}>
            <ProgressText>
              재작년 6월 고1 국어 모의고사 문제를 풀이했습니다.{"\n"}마저 다
              풀지 못한 문제들은 30일 수업 때 마무리할 계획입니다.
            </ProgressText>
          </LeftBarContainer>

          <Wrapper>
            <LeftBarContainer
              navigate={true}
              label={"숙제 노트"}
              rightIconComponent={<SettingIcon onPress={() => {}} />}
            />
          </Wrapper>

          <Wrapper>
            <LeftBarContainer
              navigate={true}
              label={"복습 노트"}
              rightIconComponent={<SettingIcon onPress={() => {}} />}
            />
          </Wrapper>
        </Contents>
      </MainLayout>

      {isTutor && (
        <CircleIconButton
          size={16}
          name="pen"
          onPress={() => {
            rbRef?.current?.open();
          }}
        />
      )}

      {/* 진도 복, 숙제 노트, 복습 노트 생성 바텀시트 */}
      <CreateNoteBSheet rbRef={rbRef} />
    </>
  );
};

export default ClassNoteScreen;

const Contents = styled.View`
  // background-color: orange;
  padding-horizontal: 15;
`;

const ProgressText = styled.Text`
  font-size: 16;
  padding-vetical: 5;
  line-height: 24;
`;

const Wrapper = styled.View``;
