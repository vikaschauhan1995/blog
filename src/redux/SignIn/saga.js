
import { takeLatest, put } from 'redux-saga/effects';
import { CHECK_USER_LOGGEDIN, SET_USER_LOGGEDIN } from './const';
import { checkIsUserLoggedIn } from './methods/checkIsUserLoggedIn';

function* checkUserLoggedin() {
  try {
    const loggedInUser = yield checkIsUserLoggedIn();
    // * set user if the user is logged in
    yield put({ type: SET_USER_LOGGEDIN, payload: loggedInUser });
  } catch (error) {
    // * if got any error while checking if the user is logged in or logged out
    yield put({ type: SET_USER_LOGGEDIN, payload: false });
    console.log("Got error in checkUserLogin* saga : ", error);
  }
}

export default function* saga() {
  yield takeLatest(CHECK_USER_LOGGEDIN, checkUserLoggedin);
}