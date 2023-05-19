import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import AddContact from "./pages/AddContact";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/addcontact" element={<AddContact />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}