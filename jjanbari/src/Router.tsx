import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Product from "./components/Product";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/Product" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;