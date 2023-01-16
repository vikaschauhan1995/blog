import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInAction } from '../redux/SignIn/action';
import '../styles/pages/SignIn.scss';

const SignIn = () => {
  // const state = useSelector(state => state);
  const dispatch = useDispatch();
  const signInClick = () => {
    dispatch(signInAction());
  }
  return (
    <div className="SignIn__container">
      <div className="SignIn__inner_container" onClick={signInClick}>
        <div className='SignIn__googleIconContainer'>
          <img src="https://www.google.com/favicon.ico" alt="google icon" />
        </div>
        <div className='SignIn__googleButtonText'>
          <div>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
