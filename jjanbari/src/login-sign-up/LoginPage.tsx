// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (userId: string, password: string) => {
    // 로그인 로직 구현
    console.log(userId, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
