// src/App.tsx
import React from "react";

import Footer from "./Layout/Footer/Footer";
import Router from "./Layout/Routes/Router";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router />
      <Footer />
    </div>
  );
};

export default App;
