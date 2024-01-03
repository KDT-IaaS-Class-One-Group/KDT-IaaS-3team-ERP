import React, {useState} from 'react';
import './App.css';

import Login from './components/Login'


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
