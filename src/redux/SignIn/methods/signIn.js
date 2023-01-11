import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebase } from '../../../firebase/firebase';

export function signIn() {
  return new Promise((resolve, reject) => {
    let google_provider = new GoogleAuthProvider();
    let auth = getAuth(firebase);
    signInWithPopup(auth, google_provider).then((res) => {
      // * If the user successfully loggedIn
      resolve(res);
      // console.log('google signIn response', res);
    }).catch((err) => {
      // * If the user failed to loggedIn
      resolve(false);
      console.log('google signIn signInWithPopup error', err);
    });
  });
}