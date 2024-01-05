import React, { useState } from 'react';

function Signup() {

  const [formData, setFormData] = useState({
    userID: '',
    userPW: '',
    userNAME: '',
  });

  // e: ~ 객체의 타입 지정
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('회원가입 성공');
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 에러 발생', error);
    }

  }

  return (
  <div>
    <h2>회원가입 하세요</h2>
      <form action="/login" onSubmit={handleSignup}>
      <input type="text" name="userNAME" placeholder="이름" value={formData.userNAME} onChange={handleInputChange}></input>
      <input type="text" name="userID" placeholder="아이디" value={formData.userID} onChange={handleInputChange}></input>
      <input type="password" name="userPW" value={formData.userPW} placeholder="비밀번호" onChange={handleInputChange}></input>
      <input type="submit" value="회원가입"></input>
  </form>
  </div>
  )
}

export default Signup;