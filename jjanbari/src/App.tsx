// src/App.tsx
import React from "react";

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Router from "./Layout/Routes/Router";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
};

export default App;
