'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [mensagem, setMensagem] = useState('');

  const sendWhatsApp = () => {
    if (!mensagem.trim()) return;
    const numero = '+5527998836800';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendWhatsApp();
    }
  };

  return (
    <footer className="rodape">
      <div className="rodape-inner">
        {/* Brand */}
        <div className="rodape-brand">
          <img src="/res/image-min.png" alt="Zero27RH" className="rodape-logo" />
          <p className="rodape-desc">
            Construindo Pontes entre Talentos e Empresas. Sua parceira em soluções de RH.
          </p>
          <div className="rodape-social">
            <h4>Siga nosso trabalho:</h4>
            <div className="rodape-social-icons">
              <button
                className="social-btn"
                onClick={() => window.open('https://www.facebook.com/share/1BR4q1FXUa/', '_blank')}
                aria-label="Facebook"
              >
                <img src="/res/facebook-min.png" alt="Facebook" />
              </button>
              <button
                className="social-btn"
                onClick={() => window.open('https://www.instagram.com/rhzero27?igsh=MWVkc290em1jYXY4dQ==', '_blank')}
                aria-label="Instagram"
              >
                <img src="/res/instagram-min.png" alt="Instagram" />
              </button>
              <button
                className="social-btn"
                onClick={() => window.open('https://www.linkedin.com/company/zero27rs/', '_blank')}
                aria-label="LinkedIn"
              >
                <img src="/res/linkedin-min.png" alt="LinkedIn" />
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="rodape-links">
          <h4>Navegue</h4>
          <nav>
            <Link href="/">Sobre Nós</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/clientes">Clientes</Link>
            <Link href="/vagas">Vagas</Link>
            <Link href="/contatos">Contato</Link>
            <Link href="/privacidade">Política de Privacidade</Link>
          </nav>
        </div>

        {/* WhatsApp */}
        <div className="rodape-whatsapp">
          <div className="whatsapp-header">
            <img src="/res/atendente.png" alt="Atendente" className="whatsapp-avatar" />
            <div>
              <h4>Fale conosco</h4>
              <span>Response em até 1h</span>
            </div>
          </div>
          <p className="whatsapp-text">
            Fale agora mesmo com nossos especialistas pelo WhatsApp!
          </p>
          <textarea
            className="whatsapp-input"
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          <button className="whatsapp-btn" onClick={sendWhatsApp} disabled={!mensagem.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Enviar mensagem
          </button>
        </div>
      </div>

      <div className="rodape-bottom">
        <p>© 2024 Zero27 RH — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
