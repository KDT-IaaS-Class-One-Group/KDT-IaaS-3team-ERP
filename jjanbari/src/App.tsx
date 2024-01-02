import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom"
import './App.css';

function handleClick() {
  window.location.href = '/login';
}

function App() {
  return (
    <div className="App">
      <h1>메인페이지입니다.</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default App;
