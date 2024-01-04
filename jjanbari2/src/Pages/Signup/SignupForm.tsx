// src/Pages/Signup/SignupForm.tsx

const SignupForm = () => {
return (    
  <form className="SignupForm">
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
    <label>
      이름:
      <input
        type="text"
        name="userNAME"
        required
      />
    </label>
    <br />
    <button type="submit">가입하기</button>
  </form>
);
};

export default SignupForm;
