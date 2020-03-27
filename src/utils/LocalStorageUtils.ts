import Lockr from "lockr";
const LOCAL_STORAGE_PREFIX = "__vtra_";

class LocalStorageUtils {
  constructor() {
    Lockr.prefix = LOCAL_STORAGE_PREFIX;
  }

  setItem(key: string, value: any): void {
    Lockr.set(key, value);
  }

  getItem(key: string): any {
    return Lockr.get(key);
  }

  removeItem(key: string): void {
    Lockr.rm(key);
  }
}

export default new LocalStorageUtils();
