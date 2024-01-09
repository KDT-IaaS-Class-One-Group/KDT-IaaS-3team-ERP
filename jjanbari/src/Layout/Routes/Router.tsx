// src/Component/Routes/Router.tsx

import { Routes, Route } from "react-router-dom";

import AdminPage from "../../pages/Admin/AdminPage";
import LoginPage from "../../pages/Login/LoginPage";
import SignupPage from "../../pages/Signup/SignupPage";
import Mypage from "../../pages/Mypage/Mypage";
import MainPage from "../../pages/Main/MainPage";

import "./Router.css";

import CartPage from "../../pages/Mypage/Cart/Cart";
import DeliveryPage from "../../pages/Mypage/Delivery/Delivery";
import LikePage from "../../pages/Mypage/Like/Like";
import OrderPage from "../../pages/Mypage/Order/Order";
import RecentPage from "../../pages/Mypage/Recent/Recent";
import WithdrawPage from "../../pages/Mypage/Withdraw/WithdrawPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/mypage" element={<Mypage />}></Route>
      <Route path="/" element={<MainPage />}></Route>

      {/* 마이 페이지 내부 */}
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/delivery" element={<DeliveryPage />}></Route>
      <Route path="/like" element={<LikePage />}></Route>
      <Route path="/order" element={<OrderPage />}></Route>
      <Route path="/recent" element={<RecentPage />}></Route>
      <Route path="/withdraw" element={<WithdrawPage />}></Route>
    </Routes>
  );
};

export default Router;
