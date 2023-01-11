import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInAction } from '../redux/SignIn/action';

const SignIn = () => {
  // const state = useSelector(state => state);
  const dispatch = useDispatch();
  const signInClick = () => {
    dispatch(signInAction());
  }
  return (
    <div>
      Sign In page
      <button onClick={signInClick}>Sign In</button>
    </div>
  )
}

export default SignIn
