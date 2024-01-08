import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleSubmit from './function/HandleSubmit';

interface FormData {
  userID: string;
  userPW: string;
  userNAME: string;
}

const SignupForm: React.FC = () => {
  // 폼 입력 상태를 관리하기 위한 state 설정
  const [formData, setFormData] = useState<FormData>({
    userID: '',
    userPW: '',
    userNAME: '',
  });

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(formData, navigate)} className="SignupForm">
      <label>
        아이디:
        <input type="text" name="userID" value={formData.userID} onChange={(e) => setFormData({ ...formData, userID: e.target.value })} required />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" name="userPW" value={formData.userPW} onChange={(e) => setFormData({ ...formData, userPW: e.target.value })} required />
      </label>
      <br />
      <label>
        이름:
        <input type="text" name="userNAME" value={formData.userNAME} onChange={(e) => setFormData({ ...formData, userNAME: e.target.value })} required />
      </label>
      <br />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default SignupForm;
