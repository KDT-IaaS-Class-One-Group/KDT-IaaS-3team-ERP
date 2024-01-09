// src/Test/Login.tsx

import React from 'react';

interface LoginProps {
  isAdmin: boolean;
  userId: string | null;
}

const Login: React.FC<LoginProps> = ({ isAdmin, userId }) => {
  const handleLogin = () => {
    // 로그인 버튼 클릭 시 userId를 전달하여 로그인
    // 관리자 여부는 여기서 사용하지 않음
  };

  return (
    <div>
      <div style={{ backgroundColor: userId === 'adroot' ? 'green' : 'transparent', padding: '10px' }}>
        {userId === 'adroot' ? (
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
