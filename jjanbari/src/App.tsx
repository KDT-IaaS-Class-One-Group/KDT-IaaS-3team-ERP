// jjanbari/src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Container from './Component/Container/Container';
import Footer from "./Component/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container />
        <Route path="/" />
        <Route path="/admin" />
        <Route path="/login" />
        <Route path="/signup" />
        <Route path="/withdraw" />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
