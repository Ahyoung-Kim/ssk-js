import React from "react";
import styled from "styled-components/native";
import color from "../../common/color";

import ClassItem from "./ClassItem";

import { FlatList, StyleSheet } from "react-native";

const ClassList = ({ classList }) => {
  // console.log("classList:  ", classList);
  return (
    <>
      <FlatList
        style={styles.container}
        data={classList}
        keyExtractor={(item) => `class_${item.tutoringId}`}
        renderItem={({ item }) => <ClassItem classItem={item} />}
      />
    </>
  );
};

export default ClassList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "visible",
  },
});
