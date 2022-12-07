import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import Head from "next/head"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import ChatScreen from "../../Components/ChatScreen"
import Sidebar from "../../Components/Sidebar"
import { auth, db } from "../../firebase"
import getRecipientEmail from "../../utils/getRecipientEmails"

function Chat({chat,messages}) {
  const[user]=useAuthState(auth);
    return (
    <Center>
    <Head>
        <title>Chat with {getRecipientEmail(chat.users,user)}</title>
    </Head>
    <Sidebar />
    <ChatContainer>
     <ChatScreen chat={chat} messages={messages} />
    </ChatContainer>
    </Center>
  )
}

export default Chat;
//Prep the Chat
//Prep the messages before render
//Firt Refrence will be to the Chat collection and Find the Document According to Params id
//Second Refrence will be message ref means create a refrence to a new collection named as "messages" using .get()
export async function getServerSideProps(context){
    //Refrence for Chat
   const ref=doc(db,'chats',context.query.id);
   //Prep the message on Server
   const messageRef = await getDocs(query(collection(ref,"messages"),orderBy("timestamp")));
   const messages=messageRef.docs.map(doc=>({
       id:doc.id,
       ...doc.data(),
   })).map(messages=>({
     ...messages,
     timestamp:messages.timestamp.toDate().getTime()
   }));

   //Prep the Chat
   const chatRes=await getDoc(ref);
   const chat={
    id:chatRes.id,
    ...chatRes.data(),
   }
        return {
            props:{
            messages:JSON.stringify(messages),
            chat:chat,
            }
        }
    }
    
    

const Center=styled.div`
display:flex;
`;

const ChatContainer=styled.div`
flex:1;
overflow:scroll;
height:100vh;

::-webkit-scrollbar{
    display:none;
}
-ms-overflow-style: none; //IE and Edge
scrollbar-width: none;  //Firefox
`;