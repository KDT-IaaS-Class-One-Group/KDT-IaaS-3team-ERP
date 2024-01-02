import React from 'react';
import SignupForm from './SignupForm';

function SignupPage () {
  const handleSignup = (userId: string, password: string, userName: string) => {
    console.log(userId, password, userName);
  };

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;