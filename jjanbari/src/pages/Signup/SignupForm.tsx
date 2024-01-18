// src/pages/Signup/SignupForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleSubmit from './function/HandleSubmit';
import { User } from '../interface/interface';

const SignupForm: React.FC = () => {
  // 폼 입력 상태를 관리하기 위한 state 설정
  const [User, setUser] = useState<User>({
    user_id: '',
    user_pw: '',
    user_name: '',
  });

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(User, navigate)} className="SignupForm">
      <label>
        아이디:
        <input type="text" name="user_id" value={User.user_id} onChange={(e) => setUser({ ...User, user_id: e.target.value })} required />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" name="user_pw" value={User.user_pw} onChange={(e) => setUser({ ...User, user_pw: e.target.value })} required />
      </label>
      <br />
      <label>
        이름:
        <input type="text" name="user_name" value={User.user_name} onChange={(e) => setUser({ ...User, user_name: e.target.value })} required />
      </label>
      <br />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default SignupForm;
