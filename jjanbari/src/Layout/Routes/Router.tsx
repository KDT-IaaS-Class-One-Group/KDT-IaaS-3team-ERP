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
import ProductManagementPage from "../../pages/Admin/Product/ProductManagementPage";
import ProductUploadPage from "../../pages/Admin/Product/ProductUpload/ProductUploadPage";
import ProductRemovePage from "../../pages/Admin/Product/ProductRemove/ProductRemovePage";
import UserManagementPage from "../../pages/Admin/User/UserManagementPage";
import OrderHistoryPage from "../../pages/Admin/User/OrderHistory/OrderHistoryPage";
import StaticsPage from "../../pages/Admin/Statics/StaticsPage";

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

      {/* 관리자 페이지 내부 */}
      <Route path="/productManagement" element={<ProductManagementPage />}></Route>
      <Route path="/productRemove" element={<ProductRemovePage />}></Route>
      <Route path="/productUpload" element={<ProductUploadPage />}></Route>
      <Route path="/userManagement" element={<UserManagementPage />}></Route>
      <Route path="/orderHistory" element={<OrderHistoryPage />}></Route>
      <Route path="/statics" element={<StaticsPage />}></Route>
    </Routes>
  );
};

export default Router;
