import React, { useState } from 'react';

type SignupFormProps = {
  onSubmit: (userId: string, password: string, userName: string) => void;
};

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userId, password, userName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="signupUserId">User ID:</label>
      <input
        type="text"
        id="signupUserId"
        name="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <br />
      <label htmlFor="signupPassword">Password:</label>
      <input
        type="password"
        id="signupPassword"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <label htmlFor="signupUserName">User Name:</label>
      <input
        type="text"
        id="signupUserName"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <br />
      <input type="submit" value="회원가입" />
    </form>
  );
};

export default SignupForm;