import { Avatar, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as EmailValidator from "email-validator";
import { collection, addDoc, query, where} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
function Sidebar() {
  const [user] = useAuthState(auth);
  //Collection Ref
  const ChatRef = collection(db, "chats");
  // Create a query against the collection.
  const q = query(ChatRef, where("users", "array-contains", user.email));
  const [chatsSnapshot] = useCollection(q);
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat"
    );
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email) {
      //We need to add Chat into DB 'Chat' Collection if it does not exist and is valid.
      const docRef = collection(db, "chats");
      addDoc(docRef, {
        users: [user.email, input],
      });
    } else {
      return alert("Please Enter a Valid email");
    }
  };
  const chatAlreadyExist = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in Chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {/*List of Chats*/}
      {chatsSnapshot?.docs.map((chat)=>(
       <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex:0.45;
border-right: 1px  solid whitesmoke;
height:100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;
::-webkit-scrollbar{
  display:none;
}
-ms-overflow-style: none; /*IE and Edge*/
scrollbar-width:none; /*Firefox */
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 2px solid whitesmoke;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  flex: 1;
  border: none;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div``;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
