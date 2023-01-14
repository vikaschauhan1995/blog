// import { getDatabase, ref, set } from 'firebase/database';
import { db } from '../../../firebase/firebase';
import { EMAIL__KEY__, DISPLAY_NAME__KEY__, PHOTO_URL__KEY__, UID__KEY__ } from '../const';
import { addDoc, collection } from 'firebase/firestore';
const userDbRef = collection(db, 'users');
export function saveUserToStorage(user) {
  return new Promise((resolve, reject) => {
    const data = {
      [EMAIL__KEY__]: user.user[EMAIL__KEY__],
      [DISPLAY_NAME__KEY__]: user.user[DISPLAY_NAME__KEY__],
      [PHOTO_URL__KEY__]: user.user[PHOTO_URL__KEY__],
      [UID__KEY__]: user.user[UID__KEY__]
    };
    try {
      addDoc(userDbRef, { ...data })
        .then(response => {
          resolve(true);
        })
        .catch(error => {
          console.log('Got error while saving user data to database in (saveUserToStorage): ', error);
          reject(false);
        });
    } catch (error) {
      console.log('Got error while saving user to firestore in saveUserToStorage error: ', error);
      reject(false);
    }
  });
}