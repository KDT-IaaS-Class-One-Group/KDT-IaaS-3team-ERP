// src/pages/Login/handleSubmit.tsx

import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const handleSubmit = (loginFormData: any) => async (e: FormEvent<HTMLFormElement>) => {
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
      const navigate = useNavigate(); // useNavigate 훅 사용

      if (data.role === 'admin') {
        // 관리자 로그인 성공
        console.log('관리자로 로그인하였습니다.');
        navigate('/admin'); // 관리자 페이지로 이동
      } else if (data.role === 'user') {
        // 사용자 로그인 성공
        console.log('사용자로 로그인하였습니다.');
        navigate('/'); // 메인 페이지로 이동
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
