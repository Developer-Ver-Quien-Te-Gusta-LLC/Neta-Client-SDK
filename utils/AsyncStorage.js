import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
};

export const getStorage = async (key) => {
  try {
    const response = await AsyncStorage.getItem(key);
    return response || "";
  } catch (err) {
    return { key: null };
  }
};
