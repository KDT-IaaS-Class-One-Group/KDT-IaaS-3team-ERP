import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import SignupPage from './login-sign-up/SignupPage';
import LoginPage from './login-sign-up/LoginPage';
import MainPage from './main/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
