import React from 'react';
// import logo from './logo.svg';
import './App.css';

function Header() {
  return (
    <div>
      <p>이것은 Header입니다.</p>
    </div>
  );
}

function Container() {
  return (
    <div>
      <p>이건 Container입니다.</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Container />
    </div>
  );
}

export default App;
