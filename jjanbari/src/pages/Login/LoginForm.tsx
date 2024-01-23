// src/pages/Login/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
import handleInputChange from './function/HandleInputChange';
import handleSubmit from './function/HandleSubmit';
import { LoginFormData } from '../interface/interface';

const LoginForm: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    user_id: '',
    user_pw: '',
  });
  const navigate = useNavigate();
  const { state, login, logout } = useAuth(); 

  const handleLogin = () => {
    // 로그인 로직 처리
    const user = { username: loginFormData.user_id }; // 로그인 시 필요한 유저 정보를 정의
    login(user);
  };

  const handleLogout = () => {
    // 로그아웃 로직 처리
    logout();
  };

  return (
    <div>
      {state.isAuthenticated ? (
        <div>
          <p>이미 로그인되었습니다.</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(loginFormData, navigate)} className="LoginForm">
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
            <button type="submit">로그인</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
