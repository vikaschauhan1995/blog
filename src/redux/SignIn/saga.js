
import { takeLatest, put } from 'redux-saga/effects';
import {
  CHECK_USER_LOGGEDIN,
  EMAIL__KEY__,
  SET_USER_LOGGEDIN,
  SIGNIN_ACTION
} from './const';
import { checkIfEmailAlreadySignedIn } from './methods/checkIfEmailAlreadySignedIn';
import { checkIsUserLoggedIn } from './methods/checkIsUserLoggedIn';
import { saveUserToStorage } from './methods/saveUserToStorage';
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
    function* runSetUserLoggedIn() {
      yield put({ type: SET_USER_LOGGEDIN, payload: isLoggedIn });
    }
    // * check if the user is already logged in before
    const isEmailAvailable = yield checkIfEmailAlreadySignedIn(isLoggedIn.user[EMAIL__KEY__]);
    if (isEmailAvailable.length > 0) {
      yield runSetUserLoggedIn();
    } else {
      // * save data to firestore
      const isUserSaved = yield saveUserToStorage(isLoggedIn);
      if (isUserSaved) {
        yield runSetUserLoggedIn();
      } else {
        console.log("User couldn't save saved in signInAction");
      }
    }
  } catch (error) {
    yield put({ type: SET_USER_LOGGEDIN, payload: false });
    console.log("Got error in signInAction* saga: ", error);
  }
}

export default function* saga() {
  yield takeLatest(CHECK_USER_LOGGEDIN, checkUserLoggedin);
  yield takeLatest(SIGNIN_ACTION, signInAction);
}