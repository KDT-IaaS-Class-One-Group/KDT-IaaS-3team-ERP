// src/Test/LoginToggle.tsx

import React, { useState, useEffect } from 'react';
import Login from './Login';

const LoginToggle: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // userId가 sessionStorage에 저장되어 있는지 확인
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (id: string) => {
    // 로그인 시 userId를 sessionStorage에 저장
    setUserId(id);
    sessionStorage.setItem('userId', id);
  };

  const handleLogout = () => {
    // 로그아웃 시 userId를 삭제하고 로그인 상태 초기화
    setUserId(null);
    sessionStorage.removeItem('userId');
  };

  return (
    <div>
      <h1>로그인/로그아웃 토글 예제</h1>
      {userId ? (
        <div>
          <p>{`안녕하세요, ${userId}님!`}</p>
          <button onClick={handleLogout}>로그아웃</button>
          {/* userId와 isAdmin을 함께 전달 */}
          <Login isAdmin={userId === 'adroot'} userId={userId} />
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={() => handleLogin('adroot')}>adroot로 로그인</button>
          {/* 다른 사용자로 로그인 버튼들 추가 */}
        </div>
      )}
    </div>
  );
};

export default LoginToggle;
