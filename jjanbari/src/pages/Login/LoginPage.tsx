// src/pages/Login/LoginPage.tsx

import LoginForm from "./LoginForm";

import './LoginPage.css';


const LoginPage = () => {
  return (
    <div id="container">
      <div className="loginContainer">
        <h1>로그인 페이지</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
