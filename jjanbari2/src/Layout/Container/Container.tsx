// src/Layout/Container/Container.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminPage from "../../Pages/Admin/AdminPage";
import LoginPage from "../../Pages/Login/LoginPage";
import SignupPage from "../../Pages/Signup/SignupPage";

import './Container.css';

const Container = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>
        <Route path="/withdraw"></Route>
        <Route path="/"></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Container;
