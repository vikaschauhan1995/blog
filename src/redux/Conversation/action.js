import { SEARCH_USER_ACTION } from "./const";



export function searchUsesAction(data) {
  return {
    type: SEARCH_USER_ACTION,
    payload: data
  }
}