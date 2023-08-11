import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FlatList, StyleSheet } from "react-native";

import HwItem from "./HwItem";

const HwList = ({ editMode = false, selectedList, setSelectedList }) => {
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
        style={styles.container}
        data={[0, 1]}
        keyExtractor={(item, idx) => `hw_${idx}`}
        renderItem={({ item }) => (
          <HwItem onPressItem={onPressItem} editMode={editMode} data={item} />
        )}
      />
    </>
  );
};

export default HwList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "visible",
  },
});
