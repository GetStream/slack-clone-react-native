import AsyncStorage from '@react-native-community/async-storage';

export default {
  flushGetRequests: () => AsyncStorage.flushGetRequests(),
  getAllKeys: () => AsyncStorage.getAllKeys(),
  getItem: async (key, defaultValue) => {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  },
  multiGet: (keys) => AsyncStorage.multiGet(keys),
  removeItem: (key) => AsyncStorage.removeItem(key),
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
