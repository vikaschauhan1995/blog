import { put, takeLatest } from "redux-saga/effects";
import { SEARCH_USER_ACTION, SET_SEARCHED_USER_LIST } from "./const";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { USERS__TABLE_KEY__, EMAIL__KEY__ } from "../SignIn/const";


function* searchUsesAction(params) {
  try {
    const usersRef = query(collection(db, USERS__TABLE_KEY__), where(EMAIL__KEY__, "==", params.payload));
    const data = yield getDocs(usersRef);
    const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    yield put({ type: SET_SEARCHED_USER_LIST, payload: list });
  } catch (error) {
    console.log('Got error while getting user for convarsation: ', error);
  }
}

export default function* saga() {
  yield takeLatest(SEARCH_USER_ACTION, searchUsesAction);
}