import React, { useState, useEffect } from "react";
import { isLoggedIn } from "./isLoggedIn";
import { Link } from "react-router-dom";

const LoginToggle: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // userId가 sessionStorage에 저장되어 있는지 확인
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsAdmin(storedUserId === "adroot");
    }
  }, []);

  const handleLogin = (id: string) => {
    // 로그인 시 userId와 isAdmin을 sessionStorage에 저장
    setUserId(id);
    setIsAdmin(id === "adroot");
    sessionStorage.setItem("userId", id);
  };

  const handleLogout = () => {
    // 로그아웃 시 userId와 isAdmin을 삭제하고 로그인 상태 초기화
    setUserId(null);
    setIsAdmin(false);
    sessionStorage.removeItem("userId");
  };

  return <Link to="/login" className="loginStatus"></Link>;
};

export default LoginToggle;
