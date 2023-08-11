import React from "react";

import { FlatList, StyleSheet } from "react-native";

import ReviewItem from "./ReviewItem";

const ReviewList = ({
  editMode,
  selectedList,
  setSelectedList,
  completed = false,
}) => {
  const onPressItem = (data) => {
    if (selectedList.includes(data)) {
      setSelectedList(selectedList.filter((el) => el != data));
    } else {
      setSelectedList([...selectedList, data]);
    }
  };

  return (
    <>
      <FlatList
        keyExtractor={(item, idx) => `review_${idx}`}
        data={[0, 1, 2, 3]}
        renderItem={({ item }) => (
          <ReviewItem
            editMode={editMode}
            onPressItem={onPressItem}
            data={item}
            completed={completed}
          />
        )}
      />
    </>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "visible",
  },
});
