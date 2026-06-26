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
      <footer className="footer">
        <p>© {new Date().getFullYear()} Manos de Vuelta. Construido con esperanza.</p>
      </footer>
    </div>
  );
}
