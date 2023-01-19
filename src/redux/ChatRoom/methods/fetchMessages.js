import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { CONVERSATION__TABLE__KEY__ } from "../../Conversation/const";

export function fetchMessages(combinedUid) {
  return new Promise((resolve, reject) => {
    onSnapshot(doc(db, CONVERSATION__TABLE__KEY__, combinedUid), (doc) => {
      if (doc.exists()) {
        resolve(doc.data());
      } else {
        resolve(undefined);
      }
    });
  });
}