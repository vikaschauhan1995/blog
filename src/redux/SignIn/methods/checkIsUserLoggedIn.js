import { getAuth, onAuthStateChanged } from "firebase/auth";

export function checkIsUserLoggedIn() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // * If the user is logged in 
        resolve(user);
      } else {
        // * If the user is not logged in
        resolve(false);
      }
    });
  });
}