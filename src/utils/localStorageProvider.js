import { tokenKey } from './constants';

export default class LocalStorageProvider {
  static setToken(token) {
    try {
      localStorage.setItem(tokenKey, token);
    } catch (e) {
      console.error(e);
    }
  }

  static getToken() {
    try {
      return localStorage.getItem(tokenKey);
    } catch (e) {
      console.error(e);
    }
  }

  static removeToken() {
    try {
      localStorage.removeItem(tokenKey);
    } catch (e) {
      console.error(e);
    }
  }
}
