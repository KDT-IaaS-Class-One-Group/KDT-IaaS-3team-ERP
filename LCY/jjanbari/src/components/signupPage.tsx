import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !password || !name) {
      alert('빈칸을 채워서 제출해주세요');
      return;
    }

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password, name }),
      });

      const result = await response.json();

      if (result.success) {
        alert('제출 되었습니다');
        navigate('/login');
      } else {
        alert(result.error || '회원가입에 실패하였습니다');
      }
    } catch (error: any) {
      console.error('Error during signup:', error.message);
      alert('회원가입에 실패하였습니다');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <br />
        <input type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <label htmlFor="password">비밀번호:</label>
        <br />
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label htmlFor="name">이름:</label>
        <br />
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default SignupPage;
