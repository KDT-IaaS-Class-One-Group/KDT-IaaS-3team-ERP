// src/App.tsx
import React from "react";
import Header from "./Layout/Header/Header";
import Container from "./Layout/Container/Container";
import Footer from "./Layout/Footer/Footer";

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container />
      <Footer />
    </div>
  );
};

export default App;
