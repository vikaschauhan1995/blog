import { CLICK_SEARCHED_USER_ACTION, SEARCH_USER_ACTION, GET_USER_CHAT_LIST_ACTION, CLICK_TO_OPEN_CHAT_ROOM_ACTION, SET_SEARCHED_USER_LIST, SET_USER_CHAT_LIST } from "./const";



export function searchUsesAction(data) {
  return {
    type: SEARCH_USER_ACTION,
    payload: data
  }
}

export function clickSearchedUserAction(data) {
  return {
    type: CLICK_SEARCHED_USER_ACTION,
    payload: data
  }
}

export function getChatListAction(currentUsersUid) {
  return {
    type: GET_USER_CHAT_LIST_ACTION,
    payload: currentUsersUid
  }
}

export function clickToOpenChatRoomAction(userInfo) {
  return {
    type: CLICK_TO_OPEN_CHAT_ROOM_ACTION,
    payload: userInfo
  }
}

export function makeDisableSearchedUserListAction() {
  return {
    type: SET_SEARCHED_USER_LIST
  }
}

export function setUserChatListAction(data) {
  return {
    type: SET_USER_CHAT_LIST,
    payload: data
  }
}
