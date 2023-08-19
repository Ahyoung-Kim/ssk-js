import AsyncStorage from "@react-native-async-storage/async-storage";

// Async-Storage에 데이터 저장
export const storeData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(e.message);
  }
};

// Async-Storage에서 데이터 불러오기
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e) {
    console.log(e.message);
  }
};

// clear asyncStorage
export const clearData = async () => {
  try {
    if ((await AsyncStorage.getAllKeys()).length > 0) {
      await AsyncStorage.clear();
    }
  } catch (e) {
    console.log("clear async storage err: ", e);
  }
};
