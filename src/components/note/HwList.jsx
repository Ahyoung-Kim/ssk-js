import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FlatList, StyleSheet } from "react-native";

import HwItem from "./HwItem";

const HwList = () => {
  return (
    <>
      <FlatList
        style={styles.container}
        data={[0, 1]}
        keyExtractor={(item, idx) => `hw_${idx}`}
        renderItem={({ item }) => <HwItem data={item} />}
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
