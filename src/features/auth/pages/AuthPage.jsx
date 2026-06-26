import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, ArrowRight, UserPlus, LogIn } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we navigated here with a specific tab intention (e.g. from Hero CTAs)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'login') {
      setIsLogin(true);
    } else if (params.get('tab') === 'register') {
      setIsLogin(false);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth success and redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-nav">
        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
          <HeartPulse className="logo-icon" size={28} />
          <span className="logo-text">Manos de Vuelta</span>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? 'Bienvenido de vuelta' : 'Únete a la comunidad'}</h2>
            <p>
              {isLogin 
                ? 'Inicia sesión para continuar ayudando.' 
                : 'Crea tu cuenta para solicitar o donar insumos.'}
            </p>
          </div>

          <div className="auth-toggle">
            <button 
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <UserPlus size={18} />
              Registro
            </button>
            <button 
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <LogIn size={18} />
              Iniciar Sesión
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input type="text" id="name" placeholder="Ej. Carlos Pérez" required />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" placeholder="tu@correo.com" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Entrar' : 'Crear cuenta'}
              <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Al {isLogin ? 'iniciar sesión' : 'registrarte'}, aceptas nuestros términos y condiciones de uso para esta plataforma solidaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
