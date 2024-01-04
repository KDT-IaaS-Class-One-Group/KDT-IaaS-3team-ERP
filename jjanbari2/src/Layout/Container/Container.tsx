// src/Layout/Container/Container.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Container = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin"></Route>
        <Route path="/login"></Route>
        <Route path="/signup"></Route>
        <Route path="/withdraw"></Route>
        <Route path="/"></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Container;
