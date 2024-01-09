// src/Test/Login.tsx

import React from 'react';

interface LoginProps {
  isAdmin: boolean;
}

const Login: React.FC<LoginProps> = ({ isAdmin }) => {
  const handleLogin = () => {
    sessionStorage.setItem('isAdmin', 'true');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <p>안녕하세요! 관리자로 로그인되었습니다.</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
};

export default Login;
