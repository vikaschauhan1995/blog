import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.js';

export function getChatList(currentUsersUid) {
  return new Promise((resolve, reject) => {
    onSnapshot(doc(db, "userChat", currentUsersUid), (doc) => {
      // console.log(`Received doc snapshot:`, doc.data());
      if (doc.data()) {
        resolve(doc.data());
      } else {
        resolve(undefined);
      }
    });
  });
}