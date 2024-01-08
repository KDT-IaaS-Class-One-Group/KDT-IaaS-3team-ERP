// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";

// 조건부 렌더링 테스트
import Admin from './Test/Admin';
import User from './Test/User';

import "./index.css";

// 사용자/관리자에 따라 렌더링할 컴포넌트 결정
// 사용자: true
// 관리자: false
const isAdmin = false;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// 조건부 렌더링
root.render(isAdmin ? <Admin /> : <User />);
