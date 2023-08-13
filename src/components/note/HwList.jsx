import React from "react";

import styled from "styled-components/native";
import color from "../../common/color";

import { FlatList, StyleSheet } from "react-native";

import HwItem from "./HwItem";
import EmptyMessage from "../common/EmptyMessage";

const HwList = ({
  hwList,
  editMode = false,
  selectedList,
  setSelectedList,
}) => {
  const onPressItem = (data) => {
    if (selectedList.includes(data)) {
      setSelectedList(selectedList.filter((el) => el != data));
    } else {
      setSelectedList([...selectedList, data]);
    }
  };

  if (!hwList) {
    return <></>;
  }

  return (
    <>
      {hwList.length == 0 ? (
        <EmptyMessage paddingVertical={15} message={"숙제 목록이 없습니다!"} />
      ) : (
        <FlatList
          style={styles.container}
          data={hwList}
          keyExtractor={(item, idx) => `hw_${idx}`}
          renderItem={({ item }) => (
            <HwItem onPressItem={onPressItem} editMode={editMode} data={item} />
          )}
        />
      )}
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
