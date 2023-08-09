import React, { useEffect, useState } from "react";
import BottomSheet from "../common/BottomSheet";
import TagColorForm from "../inputs/TagColorForm";
import client from "../../config/axios";
import { Alert } from "react-native";

const UpdateColorBSheet = ({ rbRef, tutoringId, colorKey, setRefetch }) => {
  const [tagColor, setTagColor] = useState(null);

  const handlePressButton = async () => {
    try {
      const ret = await client.put("/api/color", {
        tutoringId,
        color: tagColor,
      });

      if (ret.status == 200) {
        Alert.alert("색상이 변경되었습니다.");
        rbRef?.current?.close();
        setRefetch(true);
      }
    } catch (err) {
      console.log("update color error: ", err);
    }
  };

  useEffect(() => {
    setTagColor(colorKey);
  }, [colorKey]);

  return (
    <>
      <BottomSheet
        rbRef={rbRef}
        heightPercentage={0.4}
        onClose={() => {}}
        button={"색상 변경"}
        handlePressButton={handlePressButton}
      >
        <TagColorForm tagColor={tagColor} setTagColor={setTagColor} />
      </BottomSheet>
    </>
  );
};

export default UpdateColorBSheet;
