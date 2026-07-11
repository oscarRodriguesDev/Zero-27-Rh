import Header from "@/components/Header";
import Link from "next/link";

const services = [
  {
    title: "Recrutamento de Pessoal",
    desc: "Identificação e recrutamento ativo de candidatos para posições específicas dentro de uma empresa cliente. Utilizamos estratégias multicanais para alcançar os melhores talentos do mercado.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Employer Branding",
    desc: "Construção e fortalecimento da marca empregadora para atrair os melhores talentos. Estratégias de posicionamento no mercado de recrutamento.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Análise de Perfil e Competências",
    desc: "Avaliação detalhada das habilidades técnicas e comportamentais dos candidatos, garantindo o fit ideal entre profissional e cultura organizacional.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Avaliação de Desempenho e Potencial",
    desc: "Mapeamento de competências e identificação de talentos de alto potencial dentro da organização para planos de carreira e sucessão.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Consultoria em Recursos Humanos",
    desc: "Orientação estratégica para otimizar processos de RH, desde a estruturação de áreas até a implementação de políticas de gestão de pessoas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
  },
  {
    title: "Treinamento e Desenvolvimento",
    desc: "Programas personalizados de capacitação profissional para elevar as competências técnicas e comportamentais dos colaboradores.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: "Gestão de Processos de Recrutamento",
    desc: "Gerenciamento completo do ciclo de recrutamento, desde a abertura da vaga até a integração do novo colaborador, com métricas e relatórios.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8" /><path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Recrutamento Especializado",
    desc: "Busca direcionada para posições estratégicas e de alta complexidade, com acesso a uma rede exclusiva de profissionais qualificados.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function Servicos() {
  return (
    <>
      <Header active="Serviços" />

      <section className="serv-hero">
        <div className="serv-hero-content">
          <span className="serv-badge">O Que Oferecemos</span>
          <h1>Soluções Completas em <span className="serv-destaque">Recursos Humanos</span></h1>
          <p>Da captação ao desenvolvimento de talentos, oferecemos serviços integrados para impulsionar o potencial da sua equipe.</p>
        </div>
      </section>

      <section className="serv-grid">
        <div className="serv-grid-inner">
          {services.map((s, i) => (
            <div key={i} className="serv-card">
              <div className="serv-card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="serv-cta">
        <div className="serv-cta-inner">
          <h2>Quer saber mais sobre nossos serviços?</h2>
          <p>Solicite uma consultoria gratuita e descubra como podemos transformar seus processos de RH.</p>
          <Link href="/contatos" className="serv-btn">Solicitar Consultoria</Link>
        </div>
      </section>
    </>
  );
}
