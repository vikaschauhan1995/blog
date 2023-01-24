import { CHECK_USER_LOGGEDIN, SIGNIN_ACTION } from "./const";



export function checkUserLogin() {
  return {
    type: CHECK_USER_LOGGEDIN
  }
}


export function signInAction(provider) {
  return {
    type: SIGNIN_ACTION,
    payload: provider
  }
}