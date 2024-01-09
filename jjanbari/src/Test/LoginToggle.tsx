// src/Test/LoginToggle.tsx

import React, { useState, useEffect } from 'react';
import Login from './Login';

const LoginToggle: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // userId가 sessionStorage에 저장되어 있는지 확인
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setIsAdmin(storedUserId === 'adroot');
    }
  }, []);

  const handleLogin = (id: string) => {
    // 로그인 시 userId와 isAdmin을 sessionStorage에 저장
    setUserId(id);
    setIsAdmin(id === 'adroot');
    sessionStorage.setItem('userId', id);
  };

  const handleLogout = () => {
    // 로그아웃 시 userId와 isAdmin을 삭제하고 로그인 상태 초기화
    setUserId(null);
    setIsAdmin(false);
    sessionStorage.removeItem('userId');
  };

  return (
    <div>
      <h1>로그인/로그아웃 토글 예제</h1>
      {userId ? (
        <div>
          <p>{`ID: ${userId}`}</p>
          <button onClick={handleLogout}>로그아웃</button>
          {/* 현재 사용자가 관리자인 경우에만 isAdmin을 true로 전달 */}
          <Login isAdmin={isAdmin} userId={userId} onLogin={() => {}} />
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={() => handleLogin('adroot')}>adroot로 로그인</button>
          <button onClick={() => handleLogin('root')}>root로 로그인</button>
          {/* 다른 사용자로 로그인 버튼들 추가 */}
        </div>
      )}
    </div>
  );
};

export default LoginToggle;
