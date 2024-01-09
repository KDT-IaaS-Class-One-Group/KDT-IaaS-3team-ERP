// src/Component/Routes/Router.tsx

import { Routes, Route } from "react-router-dom";

import AdminPage from "../../pages/Admin/AdminPage";
import LoginPage from "../../pages/Login/LoginPage";
import SignupPage from "../../pages/Signup/SignupPage";
import Mypage from "../../pages/Mypage/Mypage";
import MainPage from "../../pages/Main/MainPage";

import "./Router.css";

// 마이페이지 하위 컴포넌트 import
import CartPage from "../../pages/Mypage/Cart/CartPage";
import DeliveryPage from "../../pages/Mypage/Delivery/DeliveryPage";
import LikePage from "../../pages/Mypage/Like/LikePage";
import OrderPage from "../../pages/Mypage/Order/OrderPage";
import RecentPage from "../../pages/Mypage/Recent/RecentPage";
import WithdrawPage from "../../pages/Mypage/Withdraw/WithdrawPage";

// 관리자페이지 하위 컴포넌트 import
import ProductManagement from "../../pages/Admin/Product/ProductManagementPage";
import ProductUpload from "../../pages/Admin/Product/ProductUpload/ProductUploadPage";
import ProductRemove from "../../pages/Admin/Product/ProductRemove/ProductRemovePage";
import UserManagement from "../../pages/Admin/User/UserManagementPage";
import OrderHistory from "../../pages/Admin/User/OrderHistory/OrderHistoryPage";
import Statics from "../../pages/Admin/Statics/StaticsPage";

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
