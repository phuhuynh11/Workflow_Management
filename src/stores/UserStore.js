import { makeAutoObservable } from "mobx";
import { USER_INFO } from "../utils/Constants";

class UserStore {
  userInfo = {};
  congViecHienTai = {};
  constructor() {
    makeAutoObservable(this);
  }
  setUserInfo(user) {
    this.userInfo = user;
  }

  loadUserInfo() {
    const _user = localStorage.getItem(USER_INFO);
    if (_user) {
      this.userInfo = JSON.parse(_user);
    }
  }

  setCongViecHienTai(cvht) {
    this.congViecHienTai = cvht;
  }
  isSignedIn() {
    const _user = localStorage.getItem(USER_INFO);
    return _user;
  }

  signOut() {
    localStorage.removeItem(USER_INFO);
  }
}

export default new UserStore();
