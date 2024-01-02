// src/App.tsx

import React from "react";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

import Router from "./Component/Routes/Router";

const App = () => {
  return (
    <div className="App">
      <Header />
      <>
        {" "}
        <Router />
      </>
      <Footer />
    </div>
  );
};

export default App;
