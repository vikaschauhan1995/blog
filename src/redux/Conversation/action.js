import { CLICK_SEARCHED_USER_ACTION, SEARCH_USER_ACTION, GET_USER_CHAT_LIST_ACTION } from "./const";



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