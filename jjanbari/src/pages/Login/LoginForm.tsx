// src/pages/Login/LoginForm.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <form className="LoginForm">
      <label>
        아이디:
        <input
          type="text"
          name="userID"
          required
        />
      </label>
      <br />
      <label>
        비밀번호:
        <input
          type="password"
          name="userPW"
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
