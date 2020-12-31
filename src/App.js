import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import Chatroom from './PageComponents/Chatroom'
// import SignIn from './PageComponents/SignIn';


firebase.initializeApp({
    apiKey: "AIzaSyAs-i7k8zP8hRp8MRj7G3AdRn6P8E0rnsg",
    authDomain: "superchats-234b9.firebaseapp.com",
    projectId: "superchats-234b9",
    storageBucket: "superchats-234b9.appspot.com",
    messagingSenderId: "977933243636",
    appId: "1:977933243636:web:00c7ec4ca2ab27d2cfbaa1",
    measurementId: "G-J484QWZ3N4"
})  

const auth = firebase.auth()
const firestore = firebase.firestore()

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
  const messageRef = firestore.collection("Messages")
  const query = messageRef.orderBy('createdAt').limit(25)
  const [Messages] = useCollectionData(query,{idField:'id'})
  

  
  return(<div>
    {Messages && Messages.map(msg=> <ChatMessage key={msg.id} value={msg} />)}


  </div>
  )
}

function ChatMessage(props){
  const { text,uid } = props.message
  return(<h1>{text}</h1>)
}
function SignOut(){
  return auth.currentUser && (<button onClick={()=>auth.signOut}>Sign Out</button>)
}

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

export default App;
