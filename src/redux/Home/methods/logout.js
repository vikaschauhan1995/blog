import { getAuth, signOut } from 'firebase/auth';
import { firebase } from '../../../firebase/firebase';


export function logout() {
  const auth = getAuth(firebase);
  return new Promise((resolve, reject) => {
    signOut(auth).then((res) => {
      resolve(true);
    }).catch(err => {
      reject(false);
      console.log("logout error", err);
    });
  });
}