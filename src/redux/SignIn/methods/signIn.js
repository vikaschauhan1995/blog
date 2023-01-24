import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebase } from '../../../firebase/firebase';

export function googleSignIn() {
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

export function facebookSignIn() {
  return new Promise((resolve, reject) => {
    const facebook_provider = new FacebookAuthProvider();
    const auth = getAuth(firebase);
    facebook_provider.setCustomParameters({
      'display': 'popup'
    });
    signInWithPopup(auth, facebook_provider).then((res) => {
      const user = res;
      // console.log("facebook signin user", user);
      resolve(user);
      // const credential = FacebookAuthProvider.credentialFromResult(res);
      // const accessToken = credential.accessToken;
    }).catch(error => {
      // * If the user failed to facebook loggedin
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
      console.log("facebook signing signInWithPopup error", error);
      resolve(false);
    });
  })
}