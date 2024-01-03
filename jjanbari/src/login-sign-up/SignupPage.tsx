import React from 'react';
import SignupForm from './SignupForm';
import axios from 'axios';

function SignupPage() {
  const handleSignup = (userId: string, password: string, userName: string) => {
    axios
      .post('/signUp/save', { userId, password, userName }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        if (response.status === 200) {
          alert('Signup successful');
          window.location.href = '/login';
        } else {
          alert('Error during signup');
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
}

export default SignupPage;
