import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { About } from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/about" element={<About />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
