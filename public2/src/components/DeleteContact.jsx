import React from "react";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import axios from "axios";
import { contactsRoute } from "../utils/APIRoutes";

export default function DeleteContact({ contact }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    try {
      const response = await axios.delete(`${contactsRoute}/${user._id}`, {
        data: {contact: contact}
      });
      navigate("/login");
    } catch (error) {   
    }
  };
  return (
    <Button onClick={handleClick}>
      <TiDelete />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: red;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
