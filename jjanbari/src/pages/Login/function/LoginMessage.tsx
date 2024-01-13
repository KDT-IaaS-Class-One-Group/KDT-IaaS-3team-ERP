// src/pages/Login/function/LoginMessage.tsx

import React from "react";

interface LoginMessageProps {
  isLoggedIn: boolean;
  userRole: string;
  onLogout: () => void;
}

const LoginMessage: React.FC<LoginMessageProps> = ({ isLoggedIn, userRole, onLogout }) => {
  return (
    <div>
      {isLoggedIn ? (
        <p>
          로그인 중입니다. 역할: {userRole}{" "}
          <button onClick={onLogout}>로그아웃</button>
        </p>
      ) : null}
    </div>
  );
};

export default LoginMessage;
