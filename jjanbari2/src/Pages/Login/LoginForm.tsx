// src/Pages/Login/LoginForm.tsx

const LoginForm = () => {
return (
  <form className="LoginForm">
    <label>
      아이디:
      <input
        type="text"
        name="userID"
        required
      />
    </label>
    <br />
    <label>
      비밀번호:
      <input
        type="password"
        name="userPW"
        required
      />
    </label>
    <br />
    <button type="submit">로그인</button>
  </form>
);
};

export default LoginForm;
