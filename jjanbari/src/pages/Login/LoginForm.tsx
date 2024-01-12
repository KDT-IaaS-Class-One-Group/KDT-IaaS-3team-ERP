// src/components/LoginForm.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  // 상태값은 boolean 타입으로 초기화해서, 로그인 상태를 마치 스위치 켜듯 토글할 수 있게 조정
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 처리를 담당하는 함수
  const handleLogin = () => {
    // 로그인 처리 로직

    // 로그인 상태 토글
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <form className="LoginForm">
      <label>
        아이디:
        <input type="text" name="userID" required />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" name="userPW" required />
      </label>
      <br />
      <div>
        <div className="signup">
          <Link to="/signup" className="sign">
            회원가입
          </Link>
        </div>
        <button type="button" onClick={handleLogin}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
        {isLoggedIn && <p>로그인 중입니다.</p>}
      </div>
    </form>
  );
};

export default LoginForm;
