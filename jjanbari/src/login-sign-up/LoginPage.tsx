import React from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const handleLogin = (userId: string, password: string) => {
    axios
      .post('/login-in', { userId, password }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        if (response.status === 200) {
          alert('Login successful');
          window.location.href = '/';
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
