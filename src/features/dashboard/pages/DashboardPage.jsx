import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, LayoutDashboard, PlusCircle, HandHeart, Search, LogOut, Package } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
          <HeartPulse className="logo-icon" size={28} />
          <span className="logo-text">Manos de Vuelta</span>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <LayoutDashboard size={20} />
            Inicio
          </a>
          <a href="#" className="nav-item">
            <Search size={20} />
            Explorar Casos
          </a>
          <a href="#" className="nav-item">
            <Package size={20} />
            Mis Solicitudes
          </a>
          <a href="#" className="nav-item">
            <HandHeart size={20} />
            Mis Donaciones
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={() => navigate('/')}>
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Resumen de Actividad</h1>
          <div className="user-profile">
            <div className="avatar">CP</div>
            <span>Carlos Pérez</span>
          </div>
        </header>

        {/* Acciones principales */}
        <section className="dashboard-actions">
          <button className="action-card btn-need">
            <div className="action-icon">
              <PlusCircle size={32} />
            </div>
            <div className="action-text">
              <h3>Solicitar Insumo</h3>
              <p>Crea una nueva solicitud de ayuda.</p>
            </div>
          </button>

          <button className="action-card btn-donate">
            <div className="action-icon">
              <HandHeart size={32} />
            </div>
            <div className="action-text">
              <h3>Quiero Donar</h3>
              <p>Revisa casos o publica lo que tienes.</p>
            </div>
          </button>
        </section>

        {/* Casos Recientes */}
        <section className="recent-cases">
          <h2>Casos Recientes cerca de ti</h2>
          <div className="cases-grid">
            <div className="case-card">
              <div className="case-header">
                <span className="case-badge need">Solicita</span>
                <span className="case-date">Hace 2 horas</span>
              </div>
              <h3>Losartán Potásico 50mg</h3>
              <p>Paciente hipertenso de 65 años requiere tratamiento mensual. Zona: Caracas, Chacao.</p>
              <button className="case-action-btn">Ver Detalles</button>
            </div>

            <div className="case-card">
              <div className="case-header">
                <span className="case-badge donate">Ofrece</span>
                <span className="case-date">Hace 5 horas</span>
              </div>
              <h3>Silla de ruedas estándar</h3>
              <p>Tengo una silla de ruedas en buen estado para donar a quien realmente la necesite. Zona: Valencia.</p>
              <button className="case-action-btn donate-btn">Contactar</button>
            </div>
            
            <div className="case-card">
              <div className="case-header">
                <span className="case-badge need">Solicita</span>
                <span className="case-date">Ayer</span>
              </div>
              <h3>Acetaminofén Jarabe Pediátrico</h3>
              <p>Necesito jarabe para mi bebé de 2 años con fiebre. Zona: Maracaibo, zona norte.</p>
              <button className="case-action-btn">Ver Detalles</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
