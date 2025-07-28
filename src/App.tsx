import "./App.css";

import {  Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SidePanel from "./components/SidePanel";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prompt" element={<SidePanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

