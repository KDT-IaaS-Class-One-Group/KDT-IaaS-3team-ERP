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

  console.log(formData)
  // const handleSignup = 

  return (
  <div>
    <h2>회원가입 하세요</h2>
      <form action="/login">
      <input type="text" name="name" placeholder="이름" onChange={handleInputChange}></input>
      <input type="text" name="id" placeholder="아이디" onChange={handleInputChange}></input>
      <input type="password" name="password" placeholder="비밀번호" onChange={handleInputChange}></input>
      <input type="submit" value="회원가입" onChange={handleInputChange}></input>
  </form>
  </div>
  )
}

export default Signup;