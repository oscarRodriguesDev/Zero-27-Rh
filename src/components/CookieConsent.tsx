'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted !== 'true') {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem('cookiesAccepted', 'true');
      setVisible(false);
      setLeaving(false);
    }, 300);
  };

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className={`cookie-consent ${leaving ? 'cookie-leaving' : 'cookie-entering'}`}>
      <button className="cookie-close" onClick={dismiss} aria-label="Fechar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="cookie-icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.15" />
          <circle cx="20" cy="20" r="13" fill="currentColor" opacity="0.3" />
          <circle cx="15" cy="16" r="2" fill="currentColor" />
          <circle cx="24" cy="14" r="1.5" fill="currentColor" />
          <circle cx="18" cy="24" r="2.5" fill="currentColor" />
          <circle cx="25" cy="22" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="cookie-text">
        <p className="cookie-title">🍪 Opa! Um biscoito digital apareceu aqui!</p>
        <p className="cookie-subtitle">
          A gente usa cookies pra lembrar de você e deixar sua visita mais gostosa — 
          nada de olhar seu docinho escondido, promessa de recrutador! 🤝
        </p>
      </div>

      <div className="cookie-actions">
        <button className="cookie-btn cookie-btn-primary" onClick={accept}>
          Aceitar e continuar
        </button>
        <button className="cookie-btn cookie-btn-secondary" onClick={dismiss}>
          Só vou dar uma olhada
        </button>
      </div>
    </div>
  );
}
