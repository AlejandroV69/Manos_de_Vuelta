import React from 'react';
import { HandHeart, FileText, Users, ArrowRight, HeartPulse } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <HeartPulse className="logo-icon" size={28} />
          <span className="logo-text">Manos de Vuelta</span>
        </div>
        <div className="nav-actions">
          <Link to="/auth" className="nav-link">Iniciar sesión</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Solidaridad en acción</span>
          <h1 className="hero-title">
            Conectando manos solidarias en <span>Venezuela.</span>
          </h1>
          <p className="hero-subtitle">
            Solicita o dona alimentos e insumos médicos en tu comunidad. Juntos hacemos la diferencia.
          </p>
          
          <div className="hero-ctas">
            <button className="cta-button btn-need" onClick={() => navigate('/auth?tab=register&role=need')}>
              <span>Necesito un insumo / ayuda</span>
              <ArrowRight size={20} />
            </button>
            <button className="cta-button btn-donate" onClick={() => navigate('/auth?tab=register&role=donate')}>
              <span>Quiero donar / ayudar</span>
              <HandHeart size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">¿Cómo funciona?</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon-wrapper">
              <Users className="step-icon" size={32} />
              <div className="step-number">1</div>
            </div>
            <h3>Regístrate</h3>
            <p>Crea tu cuenta de forma gratuita para unirte a nuestra comunidad solidaria.</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon-wrapper">
              <FileText className="step-icon" size={32} />
              <div className="step-number">2</div>
            </div>
            <h3>Publica o Busca</h3>
            <p>Publica tu caso si necesitas ayuda, o busca casos cercanos para donar.</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon-wrapper">
              <HandHeart className="step-icon" size={32} />
              <div className="step-number">3</div>
            </div>
            <h3>Conecten y Resuelvan</h3>
            <p>Pónganse en contacto de forma segura y realicen la entrega del insumo.</p>
          </div>
        </div>
      </section>
      
      {/* Footer simple */}
      <footer className="footer" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>¿Tienes alguna duda o sugerencia?</p>
          <a 
            href="https://www.instagram.com/viaana_alejandro/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', textDecoration: 'none', fontWeight: '500' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            Contáctame en Instagram
          </a>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>© {new Date().getFullYear()} Manos de Vuelta. Construido con esperanza.</p>
      </footer>
    </div>
  );
}
