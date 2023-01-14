import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/firebase';
import { USERS__TABLE_KEY__, EMAIL__KEY__ } from "../const";

export const checkIfEmailAlreadySignedIn = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailCollectionRef = query(collection(db, USERS__TABLE_KEY__), where(EMAIL__KEY__, '==', email));
      const data = await getDocs(emailCollectionRef);
      /** @list of @users matched with @email */
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      // console.log('list', list);
      if (list?.length) {
        resolve(list);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log('Got error while checking in checkIfEmailAlreadySignedIn : ', error);
      reject(false);
    }
  });
}