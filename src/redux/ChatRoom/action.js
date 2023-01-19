import { FETCH_MESSAGES_ACTION, SEND_MESSAGE_ACTION, SET_CHAT_ROOM_CONVERSATION__KEY__ } from "./const"



export function fetchMessagesAction(combinedUid, setMessageSnapshot) {
  return {
    type: FETCH_MESSAGES_ACTION,
    payload: combinedUid
  }
}

export function setChatRoomConversationAction(conversation) {
  return {
    type: SET_CHAT_ROOM_CONVERSATION__KEY__,
    payload: conversation
  }
}

export function clickSendMessage(messageData, combinedUid) {
  const data = { messageData, combinedUid };
  return {
    type: SEND_MESSAGE_ACTION,
    payload: data
  }
}