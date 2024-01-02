import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !password) {
      alert('빈칸을 채워서 제출해주세요');
      return;
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      const result = await response.json();

      if (result.success) {
        alert('로그인 되었습니다');
        navigate('/');
      } else {
        alert(result.error || 'ID를 확인해주세요');
      }
    } catch (error: any) {
      console.error('Error during login:', error.message);
      alert('로그인에 실패하였습니다');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <br />
        <input type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <label htmlFor="password">비밀번호:</label>
        <br />
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default LoginPage;
