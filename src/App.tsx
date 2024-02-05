// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './Auth/AuthContext';

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Router from "./Layout/Routes/Router";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Router />
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;