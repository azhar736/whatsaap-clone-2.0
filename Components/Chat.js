import { Avatar } from "@mui/material";
import { collection, doc, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components"
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmails";

function Chat({id,users}) {
// console.log(id);
const [user]=useAuthState(auth);
const router =useRouter();
 //Collection Ref
 const ChatRef = collection(db, "users");
 // Create a query against the collection.
const q = query(ChatRef, where("email","==",getRecipientEmail(users,user)));
const [recipientSnapshot]=useCollection(q);
const recipient=recipientSnapshot?.docs?.[0]?.data();
const recipientEmail=getRecipientEmail(users,user);
const enterChat=()=>{
    router.push(`/chat/${id}`)
   }
 
  return (
    <Container onClick={enterChat}>
    {recipient?(
     <UserAvatar src={recipient?.photoURL} />
    ):(
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
    )}
    <UserAvatar />
   <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container= styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
border-radius:5px;
:hover{
    background-color: #e9eaeb;
}
`;

const UserAvatar=styled(Avatar)`
margin:5px;
margin-right:15px;
`