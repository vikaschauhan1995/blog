import { put, takeLatest } from "redux-saga/effects";
import { SET_USER_LOGGEDIN } from "../SignIn/const";
import { LOGOUT_ACTION } from "./const";
import { logout } from './methods/logout';

function* logoutAction() {
  try {
    /** * @logout return @true if success otherwise @false  */
    const isSignOut = yield logout();
    // ! If @logout success set IS_USER_LOGGEDIN set to false otherwise true */
    yield put({ type: SET_USER_LOGGEDIN, payload: !isSignOut })
  } catch (error) {
    yield put({ type: SET_USER_LOGGEDIN, payload: false });
    console.log("Get error while signing out at logoutAction* :", error);
  }
}


export default function* saga() {
  yield takeLatest(LOGOUT_ACTION, logoutAction);
}