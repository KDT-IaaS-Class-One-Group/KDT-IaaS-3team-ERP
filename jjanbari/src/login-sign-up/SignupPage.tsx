import React from 'react';
import SignupForm from './SignupForm';

function SignupPage() {
  const handleSignup = async (userId: string, password: string, userName: string) => {
    try {
      const response = await fetch('http://localhost:5000/signUp/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password, userName }),
      });

      if (response.ok) {
        alert('Signup successful');
        window.location.href = '/login';
      } else {
        alert('Error during signup');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
}

export default SignupPage;
