import { aesKey, defaultPrefix, defaultStorage, defaultTime } from "@/const";
import aes from './aes.js';
export function setItem(key, value, expiraTime = defaultTime, storage = defaultStorage) {
  if (value) {
    try {
      let rsl = {}
      let resultData = {};
      if (resultData) {
        if (expiraTime > 0) {
          rsl.timeStamp = new Date().getTime() + defaultTime * 1000
        }
        const $value = aes.encrypt(JSON.stringify(value),aesKey)
        rsl.value = $value
        window[storage].setItem(defaultPrefix + key, JSON.stringify(rsl))
      }
    } catch (error) {
    }
  }
}

export function getItem(key, expiraTime = defaultTime, storage = defaultStorage) {
  const $value = window[storage].getItem(defaultPrefix + key)
  if ($value) {
    const { value, timeStamp } = JSON.parse($value)
    if (expiraTime > 0) {
      if (new Date().getTime() > timeStamp) {
        window[storage].removeItem(defaultPrefix + key)
        return {}
      } else {
        const $$val = aes.decrypt(value,aesKey)
        return JSON.parse($$val)
      }
    } else {
      const $$val = aes.decrypt(value,aesKey)
      return JSON.parse($$val)
    }
  } else {
    window[storage].removeItem(defaultPrefix + key)
    return {}
  }
}

export default {
  setItem,
  getItem
}