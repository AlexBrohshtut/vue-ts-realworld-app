import Lockr from "lockr";
const LOCAL_STORAGE_PREFIX = "__vtra_";

Lockr.prefix = LOCAL_STORAGE_PREFIX;

const setItem = (key: string, value: any): void => {
  Lockr.set(key, value);
};

const getItem = (key: string): any => {
  return Lockr.get(key);
};

const removeItem = (key: string): void => {
  Lockr.rm(key);
};

export default {
  setItem,
  getItem,
  removeItem
};
