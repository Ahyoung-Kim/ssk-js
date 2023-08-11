import React from "react";

import { FlatList, StyleSheet } from "react-native";

import ReviewItem from "./ReviewItem";

const ReviewList = () => {
  return (
    <>
      <FlatList
        keyExtractor={(item, idx) => `review_${idx}`}
        data={[0, 1, 2, 3]}
        renderItem={({ item }) => <ReviewItem data={item} />}
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
