// src/pages/Login/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import handleInputChange from './function/HandleInputChange';
import handleSubmit from './function/HandleSubmit';

interface LoginFormData {
  userID: string;
  userPW: string;
}

const LoginForm: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    userID: '',
    userPW: '',
  });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(loginFormData, navigate)} className="LoginForm">
      <label>
        아이디:
        <input
          type="text"
          name="userID"
          value={loginFormData.userID}
          onChange={handleInputChange(loginFormData, setLoginFormData)}
          required
        />
      </label>
      <br />
      <label>
        비밀번호:
        <input
          type="password"
          name="userPW"
          value={loginFormData.userPW}
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
  );
};

export default LoginForm;
