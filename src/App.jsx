import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import LandingPage from './features/landing/pages/LandingPage';
import AuthPage from './features/auth/pages/AuthPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import './index.css';

// Componente para rutas protegidas
function PrivateRoute({ session, children }) {
  if (session === undefined) {
    // Cargando estado inicial, no redirigir aún
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  return session ? children : <Navigate to="/auth" replace />;
}

function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // Verificar la sesión actual al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios de sesión en tiempo real (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Ruta pública: Autenticación */}
        {/* Si ya tiene sesión, lo redirigimos al dashboard */}
        <Route
          path="/auth"
          element={
            session && session !== undefined
              ? <Navigate to="/dashboard" replace />
              : <AuthPage />
          }
        />

        {/* Ruta privada: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute session={session}>
              <DashboardPage session={session} />
            </PrivateRoute>
          }
        />

        {/* Catch-all: redirigir a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
