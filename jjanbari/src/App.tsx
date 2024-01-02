// jjanbari/src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Container from "./Component/Container/Container";
import Footer from "./Component/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Container} />
        <Route path="/admin" component={/* Admin 페이지 컴포넌트 */} />
        <Route path="/login" component={/* 로그인 페이지 컴포넌트 */} />
        <Route path="/signup" component={/* 회원 가입 페이지 컴포넌트 */} />
        <Route path="/withdraw" component={/* 회원 탈퇴 페이지 컴포넌트 */} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
