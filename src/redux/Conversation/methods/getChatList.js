import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.js';
import { USER_CHAT__KEY__ } from '../const.js';

export function getChatList(currentUsersUid) {
  return new Promise((resolve, reject) => {
    onSnapshot(doc(db, USER_CHAT__KEY__, currentUsersUid), (doc) => {
      // console.log(`Received doc snapshot:`, doc.data());
      if (doc.data()) {
        resolve(doc.data());
      } else {
        resolve(undefined);
      }
    });
  });
}