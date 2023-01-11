
import { takeLatest, put } from 'redux-saga/effects';
import {
  CHECK_USER_LOGGEDIN,
  SET_USER_LOGGEDIN,
  SIGNIN_ACTION
} from './const';
import { checkIsUserLoggedIn } from './methods/checkIsUserLoggedIn';
import { signIn } from './methods/signIn';

function* checkUserLoggedin() {
  try {
    const loggedInUser = yield checkIsUserLoggedIn();
    // * set user if the user is logged in
    yield put({ type: SET_USER_LOGGEDIN, payload: loggedInUser });
  } catch (error) {
    // * if got any error while checking if the user is logged in or not
    yield put({ type: SET_USER_LOGGEDIN, payload: false });
    console.log("Got error in checkUserLogin* saga : ", error);
  }
}

function* signInAction() {
  try {
    const isLoggedIn = yield signIn();
    yield put({ type: SET_USER_LOGGEDIN, payload: isLoggedIn });
  } catch (error) {
    yield put({ type: SET_USER_LOGGEDIN, payload: false });
    console.log("Got error in signInAction* saga: ", error);
  }
}

export default function* saga() {
  yield takeLatest(CHECK_USER_LOGGEDIN, checkUserLoggedin);
  yield takeLatest(SIGNIN_ACTION, signInAction);
}