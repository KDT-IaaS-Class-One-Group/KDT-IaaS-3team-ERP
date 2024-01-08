// src/SignupForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import handleSubmit from "./Function/HandleSubmit";

interface FormData {
  userID: string;
  userPW: string;
  userNAME: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate(); // useNavigate Hook을 사용하여 페이지 이동을 처리

  // 폼 입력 상태를 관리하기 위한 state 설정
  const [formData, setFormData] = useState<FormData>({
    userID: "",
    userPW: "",
    userNAME: "",
  });
  // 입력 값이 변경될 때마다 호출되는 핸들러 함수
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return (    
      <form onSubmit={handleSubmit(formData, navigate)} className="SignupForm">
        <label>
          아이디:
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            name="userPW"
            value={formData.userPW}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          이름:
          <input
            type="text"
            name="userNAME"
            value={formData.userNAME}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">가입하기</button>
      </form>
  );
};

export default SignupForm;
