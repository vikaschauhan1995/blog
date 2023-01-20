import { put, takeLatest } from "redux-saga/effects";
import { CLICK_SEARCHED_USER_ACTION, CLICK_TO_OPEN_CHAT_ROOM_ACTION, SEARCH_USER_ACTION, SET_SEARCHED_USER_LIST, SET_USER_CHAT_LIST } from "./const";
import { collection, getDocs, getDoc, query, setDoc, where, doc, updateDoc, onSnapshot, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { USERS__TABLE_KEY__, EMAIL__KEY__, UID__KEY__, DISPLAY_NAME__KEY__, PHOTO_URL__KEY__ } from "../SignIn/const";
import { CONVERSATION__TABLE__KEY__, USER_INFO__KEY__, DATE__KEY__, USER_CHAT__KEY__ } from '../Conversation/const';
import { CURRENT_USER, SELECTED_USER, GET_USER_CHAT_LIST_ACTION } from './const';
import { getChatList } from './methods/getChatList';
import { SET_CHAT_ROOM_USER__KEY__ } from "../ChatRoom/const";
import { combinedUid } from "./methods/combinedUid";


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

function* clickSearchedUserAction(data) {
  const currentUser = data.payload[CURRENT_USER];
  const selectedUser = data.payload[SELECTED_USER];

  const combinedId = combinedUid(currentUser[UID__KEY__], selectedUser[UID__KEY__]);
  try {
    const conversationCollection = yield getDoc(doc(db, CONVERSATION__TABLE__KEY__, combinedId));
    if (!conversationCollection.exists()) {
      // ! create a chat in chat collection
      yield setDoc(doc(db, CONVERSATION__TABLE__KEY__, combinedId), { messages: [] });
      // ! create userChat
      const selectedUserData = {
        [UID__KEY__]: selectedUser[UID__KEY__],
        [DISPLAY_NAME__KEY__]: selectedUser[DISPLAY_NAME__KEY__],
        [PHOTO_URL__KEY__]: selectedUser[PHOTO_URL__KEY__],
        // [DATE__KEY__]: serverTimestamp()
      }
      const userListCollection = yield getDoc(doc(db, USER_CHAT__KEY__, currentUser[UID__KEY__]));
      if (!userListCollection.exists()) {
        yield setDoc(doc(db, USER_CHAT__KEY__, currentUser[UID__KEY__]), { list: [selectedUserData] });
      } else {
        yield updateDoc(doc(db, USER_CHAT__KEY__, currentUser[UID__KEY__]), {
          list: arrayUnion({ ...selectedUserData })
        });
      }

      // yield setDoc(doc(db, USER_CHAT__KEY__, selectedUser[UID__KEY__]),
      //   {
      //     [combinedId]: {
      //       [USER_INFO__KEY__]: {
      //         [UID__KEY__]: currentUser[UID__KEY__],
      //         [DISPLAY_NAME__KEY__]: currentUser[DISPLAY_NAME__KEY__],
      //         [PHOTO_URL__KEY__]: currentUser[PHOTO_URL__KEY__]
      //       },
      //       [DATE__KEY__]: serverTimestamp()
      //     }
      //   });
      // yield setDoc(doc(db, USER_CHAT__KEY__, currentUser[UID__KEY__]),
      //   {
      //     [combinedId]: {
      //       [USER_INFO__KEY__]: {
      //         [UID__KEY__]: selectedUser[UID__KEY__],
      //         [DISPLAY_NAME__KEY__]: selectedUser[DISPLAY_NAME__KEY__],
      //         [PHOTO_URL__KEY__]: selectedUser[PHOTO_URL__KEY__]
      //       },
      //       [DATE__KEY__]: serverTimestamp()
      //     }
      //   });
      // yield put({ type: '', payload: '' });
    }
  } catch (error) {
    console.log('Got error on clickSearchedUserAction*: ', error);
  }
}

function* getUserChatListAction(params) {
  const getChatList_ = yield getChatList(params.payload);
  if (getChatList_) {
    console.log("getChatList_", getChatList_.list);
    const chatObjectToArray = Object.entries(getChatList_.list);
    yield put({ type: SET_USER_CHAT_LIST, payload: chatObjectToArray });
  } else {
    // * if no chat list
    yield put({ type: SET_USER_CHAT_LIST, payload: [] });
  }
  // debugger;
}

function* clickToOpenChatRoomAction(params) {
  yield put({ type: SET_CHAT_ROOM_USER__KEY__, payload: params.payload });
}

export default function* saga() {
  yield takeLatest(SEARCH_USER_ACTION, searchUsesAction);
  yield takeLatest(CLICK_SEARCHED_USER_ACTION, clickSearchedUserAction);
  yield takeLatest(GET_USER_CHAT_LIST_ACTION, getUserChatListAction);
  yield takeLatest(CLICK_TO_OPEN_CHAT_ROOM_ACTION, clickToOpenChatRoomAction)
}