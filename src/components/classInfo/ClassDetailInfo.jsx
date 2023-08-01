import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import ClassUserInfo from "./ClassUserInfo";

import { Day } from "../../utils/date";
import InviteCodeModal from "../modal/InviteCodeModal";

const ClassDetailInfo = ({ classInfo }) => {
  const {
    dayTimeList,
    startDate,
    subject,
    tuteeName,
    tutorName,
    tutoringId,
    tutorImage,
    tuteeImage,
  } = classInfo;

  console.log(classInfo);

  // 초대 코드 모달
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Container>
        {tuteeName ? (
          <InfoContainer>
            <InfroWrapper>
              <ClassUserInfo
                profileImageUrl={tuteeImage}
                name={tuteeName}
                role="TUTEE"
              />
            </InfroWrapper>

            <InfroWrapper>
              <ClassUserInfo
                profileImageUrl={tutorImage}
                name={tutorName}
                role="TUTOR"
              />
            </InfroWrapper>
          </InfoContainer>
        ) : (
          <InfoContainer style={{ marginBottom: 10 }}>
            <InviteButton
              onPress={() => setModalVisible(true)}
              activeOpacity={0.5}
            >
              <InviteText>학생 초대</InviteText>
            </InviteButton>
          </InfoContainer>
        )}

        <InfoContainer>
          <InfroWrapper>
            <Label>과목</Label>
            <InfoText>{subject}</InfoText>
          </InfroWrapper>

          <InfroWrapper>
            <Label>요일</Label>
            <InfoText>
              {dayTimeList.map(
                (dayTime, idx) => `${(idx > 0 ? ", " : "") + Day[dayTime.day]}`
              )}
            </InfoText>
          </InfroWrapper>
        </InfoContainer>

        <DayTimeContainer>
          {dayTimeList.map((dayTime) => (
            <DayTime
              key={`${dayTime.day}_${dayTime.startTime}${dayTime.endTime}`}
            >
              <DayTimeText>{Day[dayTime.day]}</DayTimeText>
              <DayTimeText>
                {dayTime.startTime} ~ {dayTime.endTime}
              </DayTimeText>
            </DayTime>
          ))}
        </DayTimeContainer>
      </Container>

      {/* 학생 초대 코드 모달 */}
      <InviteCodeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        tutoringId={tutoringId}
      />
    </>
  );
};

export default ClassDetailInfo;

const Container = styled.View`
  background-color: ${color.COLOR_WHITE_BACKGROUND};
  width: 100%;
  padding-horizontal: 15;
  padding-top: 10;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const InfroWrapper = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: center;
  //   background-color: orange;
  padding-horizontal: 5;
  padding-vertical: 7;
`;

const InviteButton = styled.TouchableOpacity`
  width: 100%;
  height: 40;
  align-items: center;
  justify-content: center;
  border-width: 2;
  border-color: ${color.COLOR_MAIN};
  border-radius: 5;
`;

const InviteText = styled.Text`
  color: ${color.COLOR_MAIN};
  font-weight: bold;
  font-size: 16;
`;

const Label = styled.Text`
  font-weight: bold;
  font-size: 13;
  color: ${color.COLOR_GRAY_TEXT};
  width: 40;
  margin-right: 10;
  text-align: center;
`;

const InfoText = styled.Text`
  font-weight: bold;
  font-size: 16;
  flex-shrink: 1;
`;

const DayTimeContainer = styled.View`
  //   background-color: orange;
  margin-top: 5;
`;

const DayTime = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 2;
`;

const DayTimeText = styled.Text`
  font-size: 11;
  color: ${color.COLOR_GRAY_TEXT};
  padding-horizontal: 10;
`;
