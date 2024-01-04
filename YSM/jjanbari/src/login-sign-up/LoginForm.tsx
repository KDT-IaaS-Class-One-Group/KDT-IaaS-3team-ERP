import React, { useState } from 'react';

type LoginFormProps = {
  onSubmit: (userId: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userId, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="loginUserId">User ID:</label>
      <input
        type="text"
        id="loginUserId"
        name="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <br />
      <label htmlFor="loginPassword">Password:</label>
      <input
        type="password"
        id="loginPassword"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <input type="submit" value="로그인" />
    </form>
  );
};

export default LoginForm;
