import React, { useState } from 'react';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyAxr962py-YmltY-9DOcU15gR9CMDUzRxo",
  authDomain: "chatroom-fe410.firebaseapp.com",
  databaseURL: "https://chatroom-fe410.firebaseio.com",
  projectId: "chatroom-fe410",
  storageBucket: "chatroom-fe410.appspot.com",
  messagingSenderId: "497107827059",
  appId: "1:497107827059:web:6e417236ddfd2c58f32d06",
  measurementId: "G-7X7SZB560J"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <header>
        </header>
        <section>
          {user ? <SignOut />: <SignIn />}
          {/* <SignOut /> */}
        </section>
      </header>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  console.log("yes");
  return (
    <button onClick = {signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign Out</button>
  )
}
function ChatRoom() {
  const dummyRef = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoUrl} = auth.currentUser;
    await messages.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoUrl
    })
    setFormValue('');
    dummyRef.current.scrollinto
  }
}
export default App;
