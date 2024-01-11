// src/pages/Login/function/HandleSubmit.tsx

import { FormEvent } from 'react';

const handleSubmit = (loginFormData: any, handleLoginSuccess: (role: string) => void) => async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 필수 필드 확인
  if (!loginFormData.userID || !loginFormData.userPW) {
    alert('아이디와 비밀번호를 입력해주세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFormData),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.role === 'admin' || data.role === 'user') {
        // 로그인 성공
        handleLoginSuccess(data.role);
      } else {
        console.error('잘못된 역할:', data.role);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      console.error('로그인 실패:', response.statusText);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
  }
};

export default handleSubmit;
