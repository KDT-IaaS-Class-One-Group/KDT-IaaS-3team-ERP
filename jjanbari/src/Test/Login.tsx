// src/Test/Login.tsx

import React from 'react';

interface LoginProps {
  isAdmin: boolean;
}

const Login: React.FC<LoginProps> = ({ isAdmin }) => {
  const handleLogin = () => {
    sessionStorage.setItem('isAdmin', 'true');
  };

  return (
    <div>
      <div style={{ backgroundColor: isAdmin ? 'green' : 'transparent', padding: '10px' }}>
        {isAdmin ? (
          <p style={{ color: 'white' }}>안녕하세요! 관리자로 로그인되었습니다.</p>
        ) : (
          <div>
            <p>로그인이 필요합니다.</p>
            <button onClick={handleLogin}>로그인</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
