// src/pages/Login/LoginForm.tsx

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // 페이지 로딩 시 세션 스토리지에서 정보 가져오기
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    const storedUserRole = sessionStorage.getItem("userRole");

    if (storedIsLoggedIn && storedUserRole) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLoginSuccess = (role: string) => {
    // 로그인 상태와 역할 업데이트
    setIsLoggedIn(true);
    setUserRole(role);

    // 세션 스토리지에 정보 저장
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userRole", role);

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
  
    // 세션 스토리지에서 정보 삭제
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userRole");
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
        {isLoggedIn ? (
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button type="submit">로그인</button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
