import React, { useState } from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import LeftBarContainer from "../common/LeftBarContainer";
import tags from "../../common/tags";

const SelectTag = ({ tag, setTag, edit = true }) => {
  const [openTags, setOpenTags] = useState(false);

  const handlePressTag = () => {
    if (edit) {
      setOpenTags(!openTags);
    }
  };

  const handlePressTagItem = (tagKey) => {
    setTag(tagKey);
    setOpenTags(false);
  };

  return (
    <>
      <LeftBarContainer label="Tag" onPress={handlePressTag}>
        <TagContainer>
          <TagText>태그</TagText>
          <TagCircle tag={tags[tag]} />
        </TagContainer>
      </LeftBarContainer>

      {openTags && (
        <TagList>
          {Object.keys(tags)
            .filter((key) => key != 0)
            .map((key) => (
              <TagItem
                key={key}
                bgColor={tags[key]}
                onPress={handlePressTagItem.bind(this, key)}
              />
            ))}
        </TagList>
      )}
    </>
  );
};

export default SelectTag;

const TagContainer = styled.View`
  background-color: ${color.COLOR_LIGHTGRAY_BACKGROUND};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 5;
  border-radius: 100;
  width: 70;
`;

const TagText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${color.COLOR_GRAY_TEXT};
  margin-right: 5;
`;

const TagCircle = styled.View`
  background-color: ${({ tag }) => tag};
  width: 12;
  height: 12;
  border-radius: 100;
`;

const TagList = styled.View`
  background-color: ${color.COLOR_LIGHTGRAY_BACKGROUND};
  border-radius: 10;
  width: 65%;
  padding: 15px;
  gap: 15;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const TagItem = styled.Pressable`
  width: 22;
  height: 22;
  border-radius: 100;
  background-color: ${({ bgColor }) => bgColor};
`;
