import moment from "moment/moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import { auth } from "../firebase";

function Message({user,message}) {
  const [userLoggedIn]=useAuthState(auth);
  const TypeOfMessage=user === userLoggedIn.email?Sender : Receiver;
  return (
    <Conatiner>
        {/* <p>Messages goes here....</p> */}
        <TypeOfMessage>{message.messages}
        <Timestamp>{message.timestamp?moment(message.timestamp).format("LT"):"..."}</Timestamp>
        </TypeOfMessage>
    </Conatiner>
  )
}

export default Message

const Conatiner =styled.div``;

const MessageElement = styled.p`
width:fit-content;
padding-top: 8px;
padding-bottom: 8px;
padding-left:20px;
padding-right:20px;
border-radius: 8px;
/* margin:10px; */
min-width:60px;
padding-bottom: 20px;
position:relative;
text-align:right;
`
const Sender=styled(MessageElement)`
margin-left:auto;
background-color:#dcf8c6;
`
const Receiver=styled(MessageElement)`
background-color: whitesmoke;
text-align: left;
`;

const Timestamp=styled.span`
color:grey;
padding:10px;
font-size: 9px;
position:absolute;
bottom:0;
text-align: right;
right:0;
`