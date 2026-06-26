import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse, LayoutDashboard, PlusCircle, HandHeart,
  Search, LogOut, Package, X, Loader2, AlertCircle, MapPin, Phone
} from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

// Categorías sugeridas (texto libre para evitar conflictos con constraints de BD)
const CATEGORIAS_SUGERIDAS = [
  'Medicamentos', 'Alimentos', 'Ropa', 'Higiene', 'Equipo Médico', 'Otro'
];
const URGENCIAS = ['Alta', 'Media', 'Baja'];
const ESTADOS_VE = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar',
  'Carabobo', 'Cojedes', 'Delta Amacuro', 'Falcón', 'Guárico', 'Lara',
  'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre',
  'Táchira', 'Trujillo', 'Vargas', 'Yaracuy', 'Zulia',
  'Distrito Capital', 'Dependencias Federales'
];

const emptyForm = {
  title: '', description: '', category: '', quantity: '',
  urgency: 'Media', state: '', municipality: '',
};

export default function DashboardPage({ session }) {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState([]);
  const [loadingSupplies, setLoadingSupplies] = useState(true);
  const [profile, setProfile] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('need'); // 'need' | 'donate'
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch profile
  useEffect(() => {
    if (!session?.user?.id) return;
    supabase
      .from('profiles')
      .select('full_name')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [session]);

  // Fetch supplies (sin join directo, buscamos profiles por separado)
  const fetchSupplies = async () => {
    setLoadingSupplies(true);

    const { data: suppliesData, error } = await supabase
      .from('supplies')
      .select('*')
      .eq('is_resolved', false)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error || !suppliesData) {
      setLoadingSupplies(false);
      return;
    }

    // Buscar perfiles de los usuarios únicos que publicaron
    const uniqueUserIds = [...new Set(suppliesData.map((s) => s.user_id))];
    let profilesMap = {};

    if (uniqueUserIds.length > 0) {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, phone_number')
        .in('id', uniqueUserIds);

      if (profilesData) {
        profilesData.forEach((p) => { profilesMap[p.id] = p; });
      }
    }

    // Combinar supplies con su perfil correspondiente
    const enriched = suppliesData.map((s) => ({
      ...s,
      profile: profilesMap[s.user_id] || null,
    }));

    setSupplies(enriched);
    setLoadingSupplies(false);
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setFormData(emptyForm);
    setFormError('');
    setModalOpen(true);
  };

  // Form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormError('');
  };

  // Submit new supply
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    const { error } = await supabase.from('supplies').insert({
      user_id: session.user.id,
      type: modalType,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      quantity: formData.quantity,
      urgency: formData.urgency,
      state: formData.state,
      municipality: formData.municipality,
      is_resolved: false,
    });

    if (error) {
      // Mostrar detalle del error de Supabase para facilitar debugging
      setFormError(error.message || 'Hubo un error al publicar. Inténtalo de nuevo.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setModalOpen(false);
    fetchSupplies(); // Recargar el feed
  };

  // Helpers
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000 / 60);
    if (diff < 60) return `Hace ${diff} min`;
    if (diff < 1440) return `Hace ${Math.floor(diff / 60)} h`;
    return d.toLocaleDateString('es-VE', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
          <HeartPulse className="logo-icon" size={28} />
          <span className="logo-text">Manos de Vuelta</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} />Inicio</a>
          <a href="#" className="nav-item"><Search size={20} />Explorar Casos</a>
          <a href="#" className="nav-item"><Package size={20} />Mis Solicitudes</a>
          <a href="#" className="nav-item"><HandHeart size={20} />Mis Donaciones</a>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">Hola de nuevo 👋</p>
            <h1>{profile?.full_name || session?.user?.email}</h1>
          </div>
          <div className="user-profile">
            <div className="avatar">{getInitials(profile?.full_name)}</div>
          </div>
        </header>

        {/* Quick Actions */}
        <section className="dashboard-actions">
          <button className="action-card btn-need" onClick={() => openModal('need')}>
            <div className="action-icon"><PlusCircle size={32} /></div>
            <div className="action-text">
              <h3>Solicitar Insumo</h3>
              <p>Crea una nueva solicitud de ayuda.</p>
            </div>
          </button>
          <button className="action-card btn-donate" onClick={() => openModal('donate')}>
            <div className="action-icon"><HandHeart size={32} /></div>
            <div className="action-text">
              <h3>Quiero Donar</h3>
              <p>Publica lo que tienes disponible.</p>
            </div>
          </button>
        </section>

        {/* Feed */}
        <section className="recent-cases">
          <h2>Casos Recientes</h2>
          {loadingSupplies ? (
            <div className="feed-loading">
              <Loader2 size={28} className="spin" />
              <p>Cargando casos...</p>
            </div>
          ) : supplies.length === 0 ? (
            <div className="feed-empty">
              <HandHeart size={48} />
              <p>Aún no hay casos publicados. ¡Sé el primero en ayudar!</p>
            </div>
          ) : (
            <div className="cases-grid">
              {supplies.map((item) => (
                <div className="case-card" key={item.id}>
                  <div className="case-header">
                    <span className={`case-badge ${item.type === 'need' ? 'need' : 'donate'}`}>
                      {item.type === 'need' ? 'Solicita' : 'Ofrece'}
                    </span>
                    <span className="case-date">{formatDate(item.created_at)}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="case-description">{item.description}</p>
                  {item.category && (
                    <span className="case-category">{item.category}</span>
                  )}
                  <div className="case-meta">
                    <span><MapPin size={13} /> {item.municipality}, {item.state}</span>
                    {item.profile?.phone_number && (
                      <span><Phone size={13} /> {item.profile.phone_number}</span>
                    )}
                  </div>
                  <button
                    className={`case-action-btn ${item.type === 'donate' ? 'donate-btn' : ''}`}
                  >
                    {item.type === 'need' ? 'Ofrecer Ayuda' : 'Contactar'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalType === 'need' ? '📋 Nueva Solicitud' : '💚 Ofrecer Ayuda'}</h2>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {formError && (
              <div className="auth-error">
                <AlertCircle size={16} /><span>{formError}</span>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  id="title" type="text"
                  placeholder={modalType === 'need' ? 'Ej. Losartán 50mg' : 'Ej. Silla de ruedas'}
                  value={formData.title} onChange={handleChange} required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  placeholder="Explica el caso con más detalle..."
                  value={formData.description} onChange={handleChange}
                  required rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
                  <input
                    id="category"
                    type="text"
                    list="categorias-list"
                    placeholder="Ej. Medicamentos, Alimentos..."
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                  <datalist id="categorias-list">
                    {CATEGORIAS_SUGERIDAS.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Cantidad</label>
                  <input id="quantity" type="text" placeholder="Ej. 2 cajas" value={formData.quantity} onChange={handleChange} required />
                </div>
              </div>

              {modalType === 'need' && (
                <div className="form-group">
                  <label htmlFor="urgency">Urgencia</label>
                  <select id="urgency" value={formData.urgency} onChange={handleChange} required>
                    {URGENCIAS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">Estado</label>
                  <select id="state" value={formData.state} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    {ESTADOS_VE.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="municipality">Municipio</label>
                  <input id="municipality" type="text" placeholder="Tu municipio" value={formData.municipality} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={submitting}>
                {submitting
                  ? <><Loader2 size={18} className="spin" /> Publicando...</>
                  : modalType === 'need' ? 'Publicar Solicitud' : 'Publicar Donación'
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
