// src/SignupForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

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
  // 폼이 제출될 때, 호출되는 핸들러 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 서버로 회원 가입 정보 전송
    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: formData.userID,
        userPW: formData.userPW,
        userNAME: formData.userNAME,
      }),
    });

    if (response.ok) {
      console.log("회원 가입 정보 전송 성공: ", formData);
      // 가입이 성공했을 경우, 로그인 페이지로 이동
      navigate("/login");
    } else {
      console.error("회원 가입 정보 전송 실패:", response.statusText);
      alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="SignupForm">
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
        />
      </label>
      <br />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default SignupForm;
