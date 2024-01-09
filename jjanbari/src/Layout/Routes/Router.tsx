// src/Component/Routes/Router.tsx

import { Routes, Route } from "react-router-dom";

import AdminPage from "../../pages/Admin/AdminPage";
import LoginPage from "../../pages/Login/LoginPage";
import SignupPage from "../../pages/Signup/SignupPage";
import WithdrawPage from "../../pages/Mypage/Withdraw/WithdrawPage";
import MainPage from "../../pages/Main/MainPage";

import './Router.css';
import Mypage from '../../pages/Mypage/Mypage';
import OrderPage from '../../pages/Mypage/Order/Order';
import CartPage from '../../pages/Mypage/Cart/Cart';
import DeliveryPage from '../../pages/Mypage/Delivery/Delivery';
import LikePage from '../../pages/Mypage/Like/Like';
import RecentPage from '../../pages/Mypage/Recent/Recent';

const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/withdraw" element={<WithdrawPage />}></Route>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>
  );
};

export default Router;
