import React, { useEffect, useState } from 'react'
// import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { HOME_REDUCER_KEY } from '../redux/Home/const';
import { logoutAction } from '../redux/Home/action';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const messagesCollectionRef = query(collection(db, "message"), where("email", "==", "coolestvikas1995@gmail.com"));
  const dispatch = useDispatch();
  const state = useSelector(state => state[HOME_REDUCER_KEY])
  console.log("state home page ", state);
  const signOutClick = () => {
    dispatch(logoutAction());
  }
  useEffect(() => {
    const getMessages = async () => {
      const data = await getDocs(messagesCollectionRef);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getMessages();
  }, []);
  // console.log("messages", messages);
  return (
    <div>
      Home
      <div>
        <button onClick={signOutClick}>Sign out</button>
      </div>
      <div>
        <ul>
          {messages.map((message) => {
            return <li>email:{message.email}, message:{message.message}</li>;
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home
