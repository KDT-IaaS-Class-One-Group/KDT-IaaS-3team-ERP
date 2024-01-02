// src/Component/Container/Container.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import AdminPage from "../../pages/Admin/AdminPage";
import LoginPage from "../../pages/Login/LoginPage";
import SignupPage from "../../pages/Signup/SignupPage";
import WithdrawPage from "../../pages/Withdraw/WithdrawPage";
import MainPage from "../../pages/Main/MainPage";
import "./Container.css";

const Container = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default Container;
