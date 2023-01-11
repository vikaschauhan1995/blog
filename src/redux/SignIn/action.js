import { CHECK_USER_LOGGEDIN } from "./const";



export function checkUserLogin() {
  return {
    type: CHECK_USER_LOGGEDIN
  }
}
