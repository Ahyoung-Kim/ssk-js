import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";
import InputContainer from "./InputContainer";

import tags from "../../common/tags";

const TagColorForm = ({ tagColor, setTagColor }) => {
  const [openTags, setOpenTags] = useState(false);

  const handlePressTagItem = (tagKey) => {
    setTagColor(tagKey);
    setOpenTags(false);
  };

  return (
    <>
      <InputContainer label={"색상"} height={null}>
        <TagContainer>
          <TagColorButton onPress={() => setOpenTags(!openTags)}>
            <TagText>태그</TagText>
            <TagCircle tagColor={tags[tagColor]} />
          </TagColorButton>

          {openTags && (
            <>
              <TagList>
                {Object.keys(tags)
                  .filter((key) => key != 0)
                  .map((key) => (
                    <TagItem
                      key={tags[key]}
                      tagColor={tags[key]}
                      onPress={handlePressTagItem.bind(this, key)}
                    />
                  ))}
              </TagList>
            </>
          )}
        </TagContainer>
      </InputContainer>
    </>
  );
};

export default TagColorForm;

const TagContainer = styled.View`
  // background-color: orange;
  width: 100%;
  position: relative;
  padding-vertical: 3;
`;

const TagColorButton = styled.Pressable`
  background-color: ${color.COLOR_LIGHTGRAY_BACKGROUND};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 5;
  border-radius: 100px;
  width: 70;
  margin-bottom: 5;
`;

const TagText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_GRAY_TEXT};
  margin-right: 5;
`;

const TagCircle = styled.View`
  background-color: ${({ tagColor }) => tagColor};
  width: 12;
  height: 12;
  border-radius: 100px;
`;

const TagList = styled.View`
  background-color: ${color.COLOR_LIGHTGRAY_BACKGROUND};
  border-radius: 10px;
  width: 200;
  padding: 15px;
  gap: 15;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const TagItem = styled.Pressable`
  width: 20;
  height: 20;
  border-radius: 100px;
  background-color: ${({ tagColor }) => tagColor};
`;
