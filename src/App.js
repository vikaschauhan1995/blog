import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { checkUserLogin } from "./redux/SignIn/action";
import { useSelector } from 'react-redux';
import { IS_USER_LOGGEDIN, SIGNIN_REDUCER_KEY } from './redux/SignIn/const';


function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state[SIGNIN_REDUCER_KEY])
  console.log("state ", state);
  useEffect(() => {
    dispatch(checkUserLogin());
  }, []);
  if (state[IS_USER_LOGGEDIN]) {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<SignIn />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }


}

export default App;
