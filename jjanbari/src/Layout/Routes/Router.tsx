// src/Component/Routes/Router.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminPage from '../../pages/Admin/AdminPage';
import LoginPage from '../../pages/Login/LoginPage';
import SignupPage from '../../pages/Signup/SignupPage';
import WithdrawPage from '../../pages/Mypage/Withdraw/WithdrawPage';
import MainPage from '../../pages/Main/MainPage';

import './Router.css';
import Mypage from '../../pages/Mypage/Mypage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/withdraw" element={<WithdrawPage />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
