'use client';

import { useState } from 'react';
import Header from "@/components/Header";

export default function Contatos() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then(() => {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch(() => {
        alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
      });
  };

  return (
    <>
      <Header active="Contato" />

      <section className="contato-hero">
        <div className="contato-hero-content">
          <span className="contato-badge">Fale Conosco</span>
          <h1>Vamos <span className="contato-destaque">conversar</span></h1>
          <p>Tem um desafio de RH? Quer contratar ou busca uma oportunidade? Estamos prontos para ajudar.</p>
        </div>
      </section>

      <section className="contato-grid">
        <div className="contato-grid-inner">
          <div className="contato-info">
            <h3>Informações de Contato</h3>

            <div className="contato-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <strong>E-mail</strong>
                <span>contato@zero27rh.com.br</span>
              </div>
            </div>

            <div className="contato-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <strong>Telefone</strong>
                <span>(27) 99883-6800</span>
              </div>
            </div>

            <div className="contato-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <strong>Localização</strong>
                <span>Espírito Santo, Brasil</span>
              </div>
            </div>

            <div className="contato-social">
              <h4>Siga nas redes</h4>
              <div className="contato-social-icons">
                <button className="contato-social-btn" onClick={() => window.open('https://www.facebook.com/share/1BR4q1FXUa/', '_blank')} aria-label="Facebook">
                  <img src="/res/facebook-min.png" alt="Facebook" />
                </button>
                <button className="contato-social-btn" onClick={() => window.open('https://www.instagram.com/rhzero27?igsh=MWVkc290em1jYXY4dQ==', '_blank')} aria-label="Instagram">
                  <img src="/res/instagram-min.png" alt="Instagram" />
                </button>
                <button className="contato-social-btn" onClick={() => window.open('https://www.linkedin.com/company/zero27rs/', '_blank')} aria-label="LinkedIn">
                  <img src="/res/linkedin-min.png" alt="LinkedIn" />
                </button>
              </div>
            </div>
          </div>

          <div className="contato-form-wrapper">
            {submitted ? (
              <div className="contato-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Mensagem enviada com sucesso!</h3>
                <p>Entraremos em contato em até 24 horas úteis.</p>
              </div>
            ) : (
              <form
                className="contato-form"
                action="https://docs.google.com/forms/d/e/1FAIpQLSck9vjrEops6xIo1n10gZzt8vBX5fRZZ2cgSw4lFUvI8TU4qg/formResponse"
                method="POST"
                onSubmit={handleSubmit}
              >
                <h3>Envie sua mensagem</h3>
                <div className="contato-form-row">
                  <div className="contato-field">
                    <label htmlFor="nome">Nome <span>*</span></label>
                    <input type="text" id="nome" name="entry.149025847" required placeholder="Seu nome" />
                  </div>
                  <div className="contato-field">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" id="sobrenome" name="entry.1792613816" placeholder="Seu sobrenome" />
                  </div>
                </div>
                <div className="contato-form-row">
                  <div className="contato-field">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="tel" id="telefone" name="entry.1446905000" placeholder="(27) 99999-9999" />
                  </div>
                  <div className="contato-field">
                    <label htmlFor="email">E-mail <span>*</span></label>
                    <input type="email" id="email" name="entry.1203428248" required placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="contato-field">
                  <label htmlFor="mensagem">Mensagem <span>*</span></label>
                  <textarea id="mensagem" name="entry.1208907420" rows={4} required placeholder="Digite sua mensagem..."></textarea>
                </div>
                <button type="submit" className="contato-submit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Enviar Mensagem
                </button>
                <p className="contato-termo">
                  Ao clicar em enviar, você concorda que seus dados pessoais fornecidos neste formulário serão
                  coletados e processados pela Zero27 RH de acordo com a LGPD. Para mais informações,
                  consulte nossa <a href="/privacidade">Política de Privacidade</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
