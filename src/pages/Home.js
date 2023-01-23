import React, { useEffect, useState } from 'react'
// import { getAuth, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, realTimeDatabase } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_REDUCER_KEY } from '../redux/Home/const';
import { SIGNIN_REDUCER_KEY, IS_USER_LOGGEDIN } from '../redux/SignIn/const';
import { logoutAction, sendMessageAction } from '../redux/Home/action';
import { set, ref } from 'firebase/database';
import { uid } from 'uid';
import { _ID__KEY__, MESSAGE_FROM__KEY__, MESSAGE_TO__KEY__, MESSAGE__KEY__ } from '../redux/Home/const';
import '../styles/pages/Home.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ConversationHeader from '../component/ConversationHeader';
import ConversationList from '../component/ConversationList';
import ChatRoom from '../component/ChatRoom';
import { searchUsesAction } from '../redux/Conversation/action';
import SearchConversationUserList from '../component/SearchConversationUserList';
import { SERCHED_USER_LIST__KEY__, CONVERSATION_REDUCER_KEY } from '../redux/Conversation/const';

const Home = () => {
  // const messagesCollectionRef = query(collection(db, "message"), where("email", "==", "coolestvikas1995@gmail.com"));
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  // const signInReducerState = useSelector(state => state[SIGNIN_REDUCER_KEY])
  const [searchInput, setSearchInput] = useState("");
  // const [textInput, setTextInput] = useState("");
  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      dispatch(searchUsesAction(searchInput));
      console.log('Enter');
    }
  }
  // const handleTextInputChange = (event) => {
  //   const input = event.target.value;
  //   setTextInput(input);
  // }
  // const clickSubmitButton = () => {
  //   const uniqueId = uid();
  //   const data = {
  //     [_ID__KEY__]: uniqueId,
  //     [MESSAGE_FROM__KEY__]: signInReducerState[IS_USER_LOGGEDIN].email,
  //     [MESSAGE_TO__KEY__]: 'vikas.chauhan.bb@gmail.com',
  //     [MESSAGE__KEY__]: textInput
  //   };
  //   dispatch(sendMessageAction(data));
  //   // set(ref(realTimeDatabase, `/${uniqueId}/`), data);
  //   setTextInput("");
  // }

  return (
    <div className='Home__container'>
      <Container className='Home__innerContainer'>
        <Row className="Home__row">
          <Col className="Home__col d-none d-sm-block" xs={0} sm={3} md={4} lg={4} xl={4}>
            <div className="Home__leftColumnOuter">
              <div className="Home__rightColumnInner">
                <ConversationHeader />
                <div className='Home__conversationSearch'>
                  <input type="text" value={searchInput} onKeyDown={handleKeyDown} onChange={(e) => setSearchInput(e.target.value)} placeholder='Search' />
                </div>
                <div className="Home__conversationList">
                  {
                    state[CONVERSATION_REDUCER_KEY][SERCHED_USER_LIST__KEY__] ?
                      <SearchConversationUserList setSearchInput={setSearchInput} />
                      :
                      <ConversationList />
                  }
                </div>
              </div>
            </div>
          </Col>
          <Col className="Home__col" xs={12} sm={9} md={8} lg={8} xl={8}>
            <ChatRoom />
          </Col>
        </Row>
      </Container>
      {/* 
      <div>
      </div>
      <div>
        <input type="text" value={textInput} onChange={handleTextInputChange} />
        <button onClick={clickSubmitButton}>Submit</button>
      </div> */}
    </div>
  )
}

export default Home
