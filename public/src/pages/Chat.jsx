import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { registerRoute, contactsRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined);
  const handleChatChange = (chat) =>{
      setCurrentChat(chat);
  }
  

  useEffect(() => {
    const asyncFn = async () =>{
      if (!localStorage.getItem("authToken")){
        navigate("/login");
      } else{
        const data = await axios.get(`${registerRoute}`,{
          headers:{
            'Authorization': localStorage.getItem("authToken")
          }
        });
        setCurrentUser(data.data);
      }
    };
    asyncFn();
  }, [navigate]);

  

  useEffect(() =>{
    if (currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userid);
    }
  }, [currentUser]);


  // kalo belum punya pp maka harus pilih dulu
  useEffect(() => {
    const asyncFn = async () =>{
        if (currentUser){
          if(currentUser.is_ava_set){
            const response = await axios.get(`${contactsRoute}/${currentUser.username}`);
            setContacts(response.data);
          }
          else{
            navigate("/setAvatar");
          }
        } 
    };
    asyncFn();
  }, [navigate, currentUser]);



  return ( <Container>
              <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                {currentChat === undefined ? (
                  <Welcome currentUser={currentUser}/>) 
                  :
                  (<ChatContainer 
                  currentChat={currentChat} 
                  currentUser={currentUser} 
                  socket={socket}/>)
                }
              </div>
           </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;