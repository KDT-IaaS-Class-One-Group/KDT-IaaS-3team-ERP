// src/pages/Login/LoginForm.tsx

/*
  LoginForm 컴포넌트는 로그인 폼을 정의하고, 로그인 상태와 역할을 관리합니다.
  handleLoginSuccess 함수는 로그인에 성공하면 수행할 로직을 처리하고, 역할에 따라 페이지를 이동합니다.
  handleLogout 함수는 로그아웃 버튼을 클릭하면 로그아웃 로직을 처리합니다.
 */

  /* 
    <Form 내부>
    Form 내부에는 아이디와 비밀번호 입력 필드, 회원가입 링크, 로그인 버튼이 있습니다.
    onSubmit 이벤트에서는 handleSubmit 함수를 호출하여 실제 로그인 로직을 처리합니다.
  */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleSubmit from "./function/HandleSubmit";

const LoginForm: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState({
    userID: "",
    userPW: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const handleLoginSuccess = (role: string) => {
    // 로그인 성공 시 수행할 로직
    console.log(`로그인 성공! 역할: ${role}`);
    // 예: 다음 페이지로 이동 등

    // 로그인 상태와 역할 업데이트
    setIsLoggedIn(true);
    setUserRole(role);

    // 역할에 따라 다른 경로로 이동
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 로직
    setIsLoggedIn(false);
    setUserRole("");
    // 예: 로그아웃 성공 시 로직 추가
  };


  return (
    <form className="LoginForm" onSubmit={handleSubmit(loginFormData, handleLoginSuccess)}>
      <label>
        아이디:
        <input
          type="text"
          name="userID"
          required
          value={loginFormData.userID}
          onChange={(e) => setLoginFormData({ ...loginFormData, userID: e.target.value })}
        />
      </label>
      <br />
      <label>
        비밀번호:
        <input
          type="password"
          name="userPW"
          required
          value={loginFormData.userPW}
          onChange={(e) => setLoginFormData({ ...loginFormData, userPW: e.target.value })}
        />
      </label>
      <br />
      <div>
        <div className="signup">
          <Link to="/signup" className="sign">
            회원가입
          </Link>
        </div>
        <button type="submit">로그인</button>
        {/* 로그인 중인 경우 메시지 표시 */}
        {isLoggedIn && <p>로그인 중입니다.</p>}
      </div>
    </form>
  );
};

export default LoginForm;
