import React, { useState } from 'react';

function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  // e: ~ 객체의 타입 지정
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
  <div>
    <h2>회원가입 하세요</h2>
      <form action="/login">
      <input type="text" name="name" placeholder="이름"></input>
      <input type="text" name="id" placeholder="아이디"></input>
      <input type="password" name="password" placeholder="비밀번호"></input>
      <input type="submit" value="회원가입"></input>
  </form>
  </div>
  )
}

export default Signup;