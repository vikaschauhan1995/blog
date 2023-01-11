import React from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { firebase } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { HOME_REDUCER_KEY } from '../redux/Home/const';
import { logoutAction } from '../redux/Home/action';

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state[HOME_REDUCER_KEY])
  console.log("state home page ", state);
  const signOutClick = () => {
    dispatch(logoutAction());
    // const auth = getAuth(firebase);
    // signOut(auth).then((res) => {
    //   console.log("signout response", res);
    // }).catch(err => {
    //   console.log("signout error", err);
    // });
  }
  return (
    <div>
      Home
      <div>
        <button onClick={signOutClick}>Sign out</button>
      </div>
    </div>
  )
}

export default Home
