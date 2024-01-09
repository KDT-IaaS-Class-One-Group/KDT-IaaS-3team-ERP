// src/Test/LoginToggle.tsx

import React, { useState } from 'react';
import Login from './Login';

const LoginToggle: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

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
