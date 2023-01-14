import { LOGOUT_ACTION, SEND_MESSAGE_ACTION } from "./const";

export function logoutAction() {
  return {
    type: LOGOUT_ACTION
  }
}

export function sendMessageAction(data) {
  return {
    type: SEND_MESSAGE_ACTION,
    payload: data
  }
}