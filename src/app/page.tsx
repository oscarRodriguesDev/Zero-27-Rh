import Header from "@/components/Header";
import Link from "next/link";

const valores = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Inovação em Processos',
    desc: 'Utilizamos tecnologia de ponta e metodologias eficazes para tornar o recrutamento eficiente e transparente.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Personalização',
    desc: 'Cada cliente é único, e nossas soluções são adaptadas para atender às suas necessidades específicas.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
      </svg>
    ),
    title: 'Foco no Longo Prazo',
    desc: 'Não buscamos apenas preencher vagas; buscamos construir relacionamentos duradouros com clientes e candidatos.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><path d="M12 8v4" /><path d="M12 16h.01" />
      </svg>
    ),
    title: 'Transparência',
    desc: 'Transparência em todas as etapas do processo, da triagem à contratação final.',
  },
];

const stats = [
  { value: '200+', label: 'Talentos Conectados' },
  { value: '50+', label: 'Empresas Parceiras' },
  { value: '98%', label: 'Satisfação dos Clientes' },
  { value: '5+', label: 'Anos de Experiência' },
];

export default function Home() {
  return (
    <>
      <Header active="Sobre Nós" />

      {/* Hero */}
      <section className="sobre-hero">
        <div className="sobre-hero-content">
          <span className="sobre-badge">Quem Somos</span>
          <h1>Construindo Pontes entre<br /><span className="sobre-destaque">Talentos e Empresas</span></h1>
          <p>
            Na Zero27RH, acreditamos apaixonadamente que cada pessoa tem um conjunto único de habilidades e talentos
            esperando para serem descobertos. Nossa missão é conectar esses talentos excepcionais às empresas que
            desejam alcançar novos horizontes.
          </p>
          <div className="sobre-hero-actions">
            <Link href="/contatos" className="sobre-btn sobre-btn-primary">Fale Conosco</Link>
            <Link href="/servicos" className="sobre-btn sobre-btn-secondary">Nossos Serviços</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="sobre-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="sobre-stat-item">
            <span className="sobre-stat-value">{stat.value}</span>
            <span className="sobre-stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Abordagem */}
      <section className="sobre-section">
        <div className="sobre-section-inner">
          <div className="sobre-section-text">
            <span className="sobre-badge">Nossa Filosofia</span>
            <h2>Uma Abordagem Humana para Recursos Humanos</h2>
            <p>
              Nosso diferencial reside em nossa abordagem centrada nas pessoas. Não apenas procuramos as habilidades
              técnicas certas, mas também nos esforçamos para entender as motivações, valores e cultura de cada candidato.
            </p>
            <p>
              Da mesma forma, colaboramos de perto com as empresas para compreender suas metas e valores, garantindo que
              cada contratação seja uma verdadeira complementação ao time existente.
            </p>
          </div>
          <div className="sobre-section-image">
            <div className="sobre-image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="sobre-valores">
        <div className="sobre-valores-header">
          <span className="sobre-badge">O Que Nos Torna Únicos</span>
          <h2>Nossos Pilares</h2>
        </div>
        <div className="sobre-valores-grid">
          {valores.map((v) => (
            <div key={v.title} className="sobre-valor-card">
              <div className="sobre-valor-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="sobre-cta">
        <div className="sobre-cta-inner">
          <h2>Junte-se à Nossa Comunidade de Sucesso</h2>
          <p>
            Se você é uma empresa que busca impulsionar seu crescimento com os melhores talentos do mercado ou um
            profissional em busca da próxima grande oportunidade, a Zero27RH está aqui para ajudar.
          </p>
          <p>
            Vamos embarcar nesta jornada juntos, construindo um futuro de sucesso e realização.
          </p>
          <Link href="/contatos" className="sobre-btn sobre-btn-primary sobre-btn-lg">
            Entre em Contato
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
