import React,{ useState } from 'react'
import './App.css';
import firebase from 'firebase/app'

import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import Chatroom from './PageComponents/Chatroom'
// import SignIn from './PageComponents/SignIn';


const auth = firebase.auth()
const firestore = firebase.firestore()
function App() {
  const [user] = useAuthState(auth)



  return (
    <div className="App">
      <header>

      </header>
      <section>
        {user ? <Chatroom /> :  <SignIn />}
        
      </section>


    </div>
  );
}

function SignIn(){
  const signInwithGoogle=()=> {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
    return(
      <button onClick={signInwithGoogle}>Sign In With Google</button>
    )
}
function Chatroom(){
  const messageRef = firestore.collection('Messages')
  const query = messageRef.orderBy('createdAt').limit(25)
  const [Messages] = useCollectionData(query,{idField:'id'})
  const [formValue,setFormValue] = useState('')
  const sendMessage = async(e) => {
    e.preventDefault()
    const { uid,photoURL } = auth.currentUser
    await messageRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    }) 
  }

  
  return(<div><div>
    {Messages && Messages.map(msg=> <ChatMessage key={msg.id} value={msg} />)}
    </div>
    <form onSubmit={sendMessage}>
    <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}/>
    <button type = "submit>">Send</button>
  </form>
  
  </div>
  )
}

function ChatMessage(props){
  const { text,uid } = props.message
  const messageClass = uid === auth.currentUser.uid ? 'Sent' : 'Recieved'


  return(<div className={`message ${messageClass}`}>
    {/* <img src = {photoURL} /> */}
    <p>{text}</p> 

  
  </div>)
}
// function SignOut(){
//   return auth.currentUser && (<button onClick={()=>auth.signOut}>Sign Out</button>)
// }


export const firebase = !firebase.apps.length ? fb.initializeApp(firebaseConfig) : firebase.app();
