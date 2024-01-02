import React, {useState} from 'react';
import Login from './components/login';

import './App.css';

function App() {
  const [page, setPage] = useState('main');

  function handleClick() {
    setPage('login');
  }

  if (page === 'login') {
    return <Login />;
  }

  return (
    <div className="App">
      <h1>메인페이지입니다.</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default App;
