import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, setDoc,serverTimestamp } from "firebase/firestore"; 
import {auth,db} from'../firebase'
import Login from './login';
import Loading from '../Components/Loading';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  const[user,loading]=useAuthState(auth);
  useEffect(()=>{
   if(user){
    const add = async () => {
      // do something
      const dbRef = doc(collection(db, "users"));
      await setDoc(dbRef,
        {
        email: user.email,
        lastSeen:serverTimestamp(),
        photoURL:user.photoURL,
      },{ merge: true });
    }
    add();
   }
  },[user])

  if(loading) return <Loading />
  if(!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
