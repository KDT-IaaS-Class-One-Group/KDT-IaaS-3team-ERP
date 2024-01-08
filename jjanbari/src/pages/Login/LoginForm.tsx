// src/pages/Login/LoginForm.tsx

import React, { useState } from 'react';
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

  return (
    <form onSubmit={handleSubmit(loginFormData)} className="LoginForm">
      <label>
        아이디:
        <input type="text" name="userID" value={loginFormData.userID} onChange={handleInputChange(loginFormData, setLoginFormData)} required />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" name="userPW" value={loginFormData.userPW} onChange={handleInputChange(loginFormData, setLoginFormData)} required />
      </label>
      <br />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
