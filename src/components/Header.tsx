'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  active?: string;
}

export default function Header({ active }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links: { href: string; label: string; external?: boolean; admin?: boolean }[] = [
    { href: '/', label: 'Sobre Nós' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/vagas', label: 'Vagas' },
    { href: '/blog', label: 'Blog' },
    { href: '/contatos', label: 'Contato' },
    { href: '/admin', label: 'Admin', admin: true },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`cabecalho${scrolled ? ' scrolled' : ''}`}>
      <div className="cabecalho-inner">
        <Link href="/" className="cabecalho-logo" onClick={closeMenu}>
          <img src="/res/icone-zero.png" alt="Zero27RH" />
        </Link>

        <button
          className={`menu-hamburger ${menuOpen ? 'hamburger-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`menu ${menuOpen ? 'menu-open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`menu-link ${active === link.label ? 'link-active' : ''} ${link.admin ? 'menu-link-admin' : ''}`}
              onClick={closeMenu}
            >
              {link.admin && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
              {link.label}
            </Link>
          ))}
          <div className="menu-link menu-link-theme">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
