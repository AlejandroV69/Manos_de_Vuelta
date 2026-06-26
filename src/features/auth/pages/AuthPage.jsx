import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, ArrowRight, ArrowLeft, UserPlus, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

const ESTADOS_VENEZUELA = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar',
  'Carabobo', 'Cojedes', 'Delta Amacuro', 'Falcón', 'Guárico', 'Lara',
  'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre',
  'Táchira', 'Trujillo', 'Vargas', 'Yaracuy', 'Zulia',
  'Distrito Capital', 'Dependencias Federales'
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
    state: '',
    municipality: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'login') setIsLogin(true);
    else if (params.get('tab') === 'register') setIsLogin(false);
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
  };

  const handleTabChange = (loginMode) => {
    setIsLogin(loginMode);
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { full_name, email, password, phone_number, state, municipality } = formData;

    // 1. Crear usuario en Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Insertar (o actualizar si ya existe) el perfil en la tabla `profiles`
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name,
          phone_number,
          state,
          municipality,
        }, { onConflict: 'id' });

      if (profileError) {
        setError('Cuenta creada, pero hubo un error al guardar tu perfil. Puedes actualizarlo más tarde.');
      }
    }

    setLoading(false);
    navigate('/dashboard');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { email, password } = formData;

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#4b5563' }}
          className="back-btn"
        >
          <ArrowLeft size={24} />
          <span style={{ marginLeft: '8px', fontWeight: '500' }}>Volver</span>
        </button>
        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
          <HeartPulse className="logo-icon" size={28} />
          <span className="logo-text">Manos de Vuelta</span>
        </div>
        <div style={{ width: '80px' }}></div> {/* Spacer to center logo */}
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
            <button className={`toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => handleTabChange(false)}>
              <UserPlus size={18} />
              Registro
            </button>
            <button className={`toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => handleTabChange(true)}>
              <LogIn size={18} />
              Iniciar Sesión
            </button>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="full_name">Nombre completo</label>
                <input
                  type="text"
                  id="full_name"
                  placeholder="Ej. Carlos Pérez"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="phone_number">Número de teléfono</label>
                  <input
                    type="tel"
                    id="phone_number"
                    placeholder="Ej. 0412-1234567"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {ESTADOS_VENEZUELA.map((est) => (
                        <option key={est} value={est}>{est}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="municipality">Municipio</label>
                    <input
                      type="text"
                      id="municipality"
                      placeholder="Tu municipio"
                      value={formData.municipality}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading
                ? <><Loader2 size={20} className="spin" /> Procesando...</>
                : <>{isLogin ? 'Entrar' : 'Crear cuenta'} <ArrowRight size={20} /></>
              }
            </button>
          </form>

          <div className="auth-footer">
            <p>Al {isLogin ? 'iniciar sesión' : 'registrarte'}, aceptas nuestros términos de uso para esta plataforma solidaria.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
