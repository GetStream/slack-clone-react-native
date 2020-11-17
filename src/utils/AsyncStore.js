import AsyncStorage from '@react-native-community/async-storage';

export default {
  getItem: async (key, defaultValue) => {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: key => {
    return AsyncStorage.removeItem(key);
  },
  getAllKeys: () => {
    return AsyncStorage.getAllKeys();
  },
  multiGet: keys => {
    return AsyncStorage.multiGet(keys);
  },
  flushGetRequests: () => {
    return AsyncStorage.flushGetRequests();
  },
};
