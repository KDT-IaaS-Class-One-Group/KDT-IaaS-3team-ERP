// src/pages/Login/LoginForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  id: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    id: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 필수 필드 확인
    if (!loginFormData.id || !loginFormData.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 서버로 로그인 정보 전송
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      if (response.ok) {
        console.log("로그인 성공!");
        // 로그인이 성공했을 경우, 메인 페이지로 이동
        navigate("/");
      } else {
        console.error("로그인 실패:", response.statusText);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 실패: ", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="LoginForm">
        <label>
          아이디:
          <input
            type="text"
            name="id"
            value={loginFormData.id}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
