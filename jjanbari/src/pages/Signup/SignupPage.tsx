// src/pages/Signup/SignupPage.tsx

import SignupForm from "./SignupForm";

import './SignupPage.css'

const SignupPage = () => {
  return (
    <div id="container">
      <div className="signupContainer">
        <h1>Sign up</h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
