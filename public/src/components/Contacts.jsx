import React, { useState, useEffect } from "react";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { userHost } from "../utils/APIRoutes";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";
import axios from "axios";

export default function Contacts({contacts,currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [userContacts, setUserContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUsers = Promise.all(contacts.map(async (contact, index)=>{
        try {
          const response = await axios.get(`${userHost}/users/name/${contact.contact}`,{
            headers:{
              'Authorization': localStorage.getItem("authToken")
            }
          });
          return response.data;
        } catch (error) {
          return;
        }
      }));

      fetchUsers.then(data => setUserContacts(data))
    }, [contacts]);

    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    };

    useEffect(() =>{
        if (currentUser){
            setCurrentUserImage(currentUser.avatar);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const handleClick = async () => {
      navigate("/addcontact")
    };

  return <>
  {
    currentUserImage && currentUserName && (
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>LawChat</h3>
        </div>
        <div className="contacts">
          {
            userContacts.map((contact,index)=> {
              return (
                <div className={`contact ${index === currentSelected ? 
                "selected": ""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="contacts-footer">
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
            <div style={{display: "flex"}}>
              <Button onClick={handleClick}>
                <RiContactsBook2Fill />
              </Button>
              <Logout />
            </div>           
          </div>
      </Container>
    )
  }
  </>;
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #0d0d30;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .contacts-footer {
    background-color: #0d0d30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

