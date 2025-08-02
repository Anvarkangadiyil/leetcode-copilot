import { lazy } from 'react';
import ReactDOM from 'react-dom/client'
import "./index.css";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
const Home = lazy(() => import('./pages/Home'));
const SidePanel = lazy(() => import('./components/SidePanel'));

ReactDOM.createRoot(document.getElementById('root')!).render( 
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prompt" element={<SidePanel />} />
      </Routes>
    </MemoryRouter>
    
);
