import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './features/landing/pages/LandingPage';
import AuthPage from './features/auth/pages/AuthPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de inicio: Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Ruta de autenticación: Login y Registro */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Ruta del Dashboard: Central para pedir y donar */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Redirección en caso de ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
