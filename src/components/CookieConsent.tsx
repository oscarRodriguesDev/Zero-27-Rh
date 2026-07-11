'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted !== 'true') {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div id="cookie-notice">
      <p>Nós usamos cookies para garantir que você obtenha a melhor experiência em nosso site. Ao continuar navegando, você concorda com nossa política de cookies.</p>
      <button id="accept-cookies" onClick={accept}>Aceitar</button>
    </div>
  );
}
