import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { CONVERSATION__TABLE__KEY__ } from "../../Conversation/const";



export function sendMessage(combinedUid, messageData) {
  return new Promise((resolve, reject) => {
    try {
      updateDoc(doc(db, CONVERSATION__TABLE__KEY__, combinedUid), {
        messages: arrayUnion({ ...messageData })
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log('Got Error while sending message: ' + err.message);
    }
  });
}