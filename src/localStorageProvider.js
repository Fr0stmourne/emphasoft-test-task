import { tokenKey } from "./constants";

export default class LocalStorageProvider {
  static setToken(token) {
    try {
      localStorage.setItem(tokenKey, token);
    } catch (e) {
      console.error(e);
    }
  }

  static getToken() {
    return localStorage.getItem(tokenKey);
  }

  static removeToken() {
    try {
      localStorage.removeItem(tokenKey);
    } catch (e) {
      console.error(e);
    }
  }
}