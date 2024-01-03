import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'

import './App.css';

function App() {
  const [page, setPage] = useState('main');

  function handleClick() {
    setPage('login');
  }

  if (page === 'login') {
    return <Login />;
  }

  function Mainpage() {
    return (
    <div className="App">
      <h1>메인페이지입니다.</h1>
      <button onClick={handleClick}>Login</button>
    </div>
    )
  }

  return (
    <Mainpage />
  );
}

export default App;
