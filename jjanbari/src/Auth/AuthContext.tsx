// src/Auth/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// AuthContextProps 인터페이스 정의
interface AuthContextProps {
  isLoggedIn: boolean;
  user_id: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

// createContext를 사용하여 Context 객체 생성 및 초기값 undefined로 설정
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider 컴포넌트 정의
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // useState를 사용하여 isLoggedIn 상태와 login, logout 함수 정의
  const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
    // 세션 스토리지에서 값 가져오기
    const storedValue = sessionStorage.getItem('isLoggedIn');
    // 세션 스토리지에 isLoggedIn에 대한 값이 존재하면 파싱한 값을 반환하고, 없으면 false를 리턴
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [user_id, setUserId] = useState<string | null>(() => {
    // 세션 스토리지에서 user_id 값 가져오기
    return sessionStorage.getItem('user_id');
  });

  // 로그인 함수
  const login = (userId: string) => {
    setLoggedIn(true);
    setUserId(userId);
    // 세션 스토리지에 값 저장
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
    sessionStorage.setItem('user_id', userId);
  };

  // 로그아웃 함수
  const logout = () => {
    setLoggedIn(false);
    setUserId(null);
    // 세션 스토리지에서 값 제거
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user_id');
  };

  // AuthContext.Provider로 전역 상태 및 함수 제공
  return (
    <AuthContext.Provider value={{ isLoggedIn, user_id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 커스텀 훅 정의
export const useAuth = () => {
  // useContext를 사용하여 AuthContext의 값 가져오기
  const context = useContext(AuthContext);

  // AuthContext가 제대로 설정되지 않은 경우 에러 throw
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // AuthContext의 값 반환
  return context;
};
