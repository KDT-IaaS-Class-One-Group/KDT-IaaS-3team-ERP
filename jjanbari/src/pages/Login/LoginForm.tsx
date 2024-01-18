// src/pages/Login/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import handleInputChange from './function/HandleInputChange';
import handleSubmit from './function/HandleSubmit';
import { LoginFormData } from '../interface/interface';

const LoginForm: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    user_id: '',
    user_pw: '',
  });
  const loginError = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (id: string) => {
    // 로그인 시 userId와 isAdmin을 sessionStorage에 저장
    sessionStorage.setItem('userId', id);
  };

  const handleLoginSuccess = (role: string) => {
    console.log(`${role}으로 로그인하였습니다.`);

    // 세션 스토리지에 userId 저장
    sessionStorage.setItem('userId', loginFormData.userID);

    if (role === 'admin') {
      navigate('/admin'); // 관리자 페이지로 이동
    } else {
      navigate('/'); // 메인 페이지로 이동
    }
  };

  return (
    <form onSubmit={handleSubmit(loginFormData, handleLoginSuccess)} className="LoginForm">
      {loginError && <p style={{ color: 'white', background: 'red' }}>로그인이 필요합니다.</p>}
      <label>
        아이디:
        <input
          type="text"
          name="user_id"
          value={loginFormData.user_id}
          onChange={handleInputChange(loginFormData, setLoginFormData)}
          required
        />
      </label>
      <br />
      <label>
        비밀번호:
        <input
          type="password"
          name="user_pw"
          value={loginFormData.user_pw}
          onChange={handleInputChange(loginFormData, setLoginFormData)}
          required
        />
      </label>
      <br />
      <div>
        <div className="signup">
          <Link to="/signup" className='sign'>
            회원가입
          </Link>
        </div>
        <button type="submit" onClick={() => handleLogin(loginFormData.userID)}>로그인</button>
      </div>
    </form>
  );
};

export default LoginForm;
