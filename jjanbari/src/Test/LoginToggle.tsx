// src/Test/LoginToggle.tsx

import React, { useState, useEffect } from 'react';
import Login from './Login';

const LoginToggle: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
    // 초기 상태를 sessionStorage에서 가져오기
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  useEffect(() => {
    // 로그인 상태가 변경될 때 sessionStorage에 저장
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleToggle = () => {
    setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  return (
    <div>
      <h1>로그인/로그아웃 토글 예제</h1>
      <button onClick={handleToggle}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
      {isLoggedIn && <Login isAdmin={isLoggedIn} />}
    </div>
  );
};

export default LoginToggle;
