'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  '/res/slide/1.png',
  '/res/slide/2.png',
  '/res/slide/3.png',
  '/res/slide/4.png',
  '/res/slide/5.png',
  '/res/slide/6.png',
  '/res/slide/8.png',
  '/res/slide/9.png',
  '/res/slide/10.png',
  '/res/slide/11.png',
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Banner Zero27 RH"
    >
      {/* Camada das imagens */}
      <div className="hero-slider-track">
        {slides.map((src, index) => (
          <div
            key={src}
            className={`hero-slide ${index === current ? 'slide-active' : ''}`}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="hero-slide-img"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Overlay gradiente escuro */}
      <div className="hero-overlay" />

      {/* Conteúdo central */}
      <div className="hero-content">
        <div className="hero-content-inner">
          <span className="hero-since">Desde 2020</span>
          <h1 className="hero-title">
            <span className="hero-title-light">Zero27</span>
            <span className="hero-title-bold">RH</span>
          </h1>
          <p className="hero-subtitle">
            Construindo Pontes entre <span className="hero-destaque">Talentos</span> e{' '}
            <span className="hero-destaque">Empresas</span>
          </p>
          <div className="hero-actions">
            <Link href="/contatos" className="hero-btn hero-btn-primary">
              Fale Conosco
            </Link>
            <Link href="/servicos" className="hero-btn hero-btn-secondary">
              Nossos Serviços
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === current ? 'dot-active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span>Role para conhecer</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle cx="8" cy="8" r="2" fill="currentColor" className="scroll-dot" />
        </svg>
      </div>
    </section>
  );
}
