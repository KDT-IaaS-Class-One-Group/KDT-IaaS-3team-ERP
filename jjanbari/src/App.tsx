import React, {useState} from 'react';
import './App.css';


function App() {

  function loginClick() {
    window.location.href="/login"
  }


  function Mainpage() {
    return (
    <div className="App">
      <h1>메인페이지입니다.</h1>
      <button onClick={loginClick}>Login</button>
    </div>
    )
  }

  return (
    <Mainpage />
  );
}

export default App;
