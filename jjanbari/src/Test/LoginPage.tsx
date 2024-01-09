// src/Test/Login.tsx

import React from 'react';

import './LoginPage.css';

interface LoginProps {
  isAdmin: boolean;
  userId: string | null;
  onLogin: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ isAdmin, userId, onLogin }) => {
  return (
    <div>
      <div style={{ backgroundColor: userId ? 'green' : 'transparent', padding: '10px' }}>
        {userId && (
          <p style={{ color: 'white' }}>
            {`${userId}님, 안녕하세요!${
              isAdmin ? ' (관리자로 로그인됨)' : ' (사용자로 로그인됨)'
            }`}
          </p>
        )}
        {!userId && (
          <div>
            <p style={{ color: 'white' }}>로그인이 필요합니다.</p>
            <button onClick={onLogin}>로그인</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
