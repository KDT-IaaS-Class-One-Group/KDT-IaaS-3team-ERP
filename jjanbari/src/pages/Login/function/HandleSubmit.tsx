// src/pages/Login/function/HandleSubmit.tsx

import { FormEvent } from 'react';

const handleSubmit = (loginFormData: any, navigate: any) => async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 필수 필드 확인
  if (!loginFormData.user_id || !loginFormData.user_pw) {
    alert('아이디와 비밀번호를 입력해주세요.');
    return;
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: loginFormData.user_id,
        userPW: loginFormData.user_pw,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.role === 'admin') {
        // 관리자 로그인 성공
        console.log('관리자로 로그인하였습니다.');

        // 세션 스토리지에 user_id 저장
        sessionStorage.setItem('user_id', loginFormData.user_id);

        navigate('/admin'); // 관리자 페이지로 이동
      } else if (data.role === 'user') {
        // 사용자 로그인 성공
        console.log('사용자로 로그인하였습니다.');

        // 세션 스토리지에 user_id 저장
        sessionStorage.setItem('user_id', loginFormData.user_id);

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
