import React from 'react';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = async (userId: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/login-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        alert('Login successful');
        window.location.href = '/';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
