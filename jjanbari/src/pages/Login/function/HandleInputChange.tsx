// src/pages/Login/function/handleInputChange.tsx

/* 
  이 함수는 입력 필드  의 값이 변경될 때마다 호출되어 상태를 업데이트합니다.
  LoginForm 컴포넌트에서 아이디와 비밀번호 입력 필드의 값이 변경될 때에 사용합니다.
  이 함수를 통해 사용자가 입력한 값을 상태에 반영해서 로그인 폼의 상태를 업데이트합니다.
*/

import { ChangeEvent } from 'react';

const handleInputChange = (loginFormData: any, setLoginFormData: any) => (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLoginFormData({
    ...loginFormData,
    [name]: value,
  });
};

export default handleInputChange;
