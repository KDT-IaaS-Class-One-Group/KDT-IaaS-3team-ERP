// src/pages/Login/function/handleSubmit.tsx

/* 
  handleSubmit 함수는 로그인 폼을 제출하면 수행되는 로직을 정의합니다.
  필수 필드가 입력되었는지 확인하고, 서버에 로그인 요청을 보내고 응답을 처리합니다.
  로그인에 성공하면 handleLoginSuccess 함수를 호출해 로그인 상태와 역할을 업데이트하고, 페이지를 이동합니다.
*/

import { FormEvent } from 'react';

const handleSubmit = (loginFormData: any, handleLoginSuccess: (role: string) => void) => async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 필수 필드 확인
  if (!loginFormData.user_id || !loginFormData.user_pw) {
    alert('아이디와 비밀번호를 입력해주세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/login', {
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
