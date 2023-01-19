import { takeLatest, put } from "redux-saga/effects";
import { FETCH_MESSAGES_ACTION, SEND_MESSAGE_ACTION, SET_CHAT_ROOM_CONVERSATION__KEY__ } from "./const";
import { fetchMessages } from "./methods/fetchMessages";
import { sendMessage } from "./methods/sendMessage";

function* fetchMessagesAction(params) {
  const messages = yield fetchMessages(params.payload);
  // console.log(messages);
  // debugger;
  yield put({ type: SET_CHAT_ROOM_CONVERSATION__KEY__, payload: messages });
}

function* sendMessageAction(params) {
  const sendMessage_ = yield sendMessage(params.payload.combinedUid, params.payload.messageData);
  if (sendMessage_ === true) {
    try {
      // params.payload?.callback();
    } catch (err) {
      console.log('Got Error in sendMessageAction* :', err);
    }
    // yield put({ type: '' });
  } else {
    console.log("Message couldn't send");
  }
}

export default function* saga() {
  yield takeLatest(FETCH_MESSAGES_ACTION, fetchMessagesAction);
  yield takeLatest(SEND_MESSAGE_ACTION, sendMessageAction);
}