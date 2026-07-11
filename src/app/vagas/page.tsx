import Header from "@/components/Header";
import Link from "next/link";

const vagas = [
  {
    title: "Assistente Administrativo",
    img: "/res/vagas/1.png",
    desc: "Junte-se à nossa equipe como Assistente Administrativo e faça parte de uma equipe dinâmica! Se você é organizado, proativo e possui habilidades excepcionais de comunicação, esta é a oportunidade para você.",
    tipo: "Presencial",
    periodo: "Integral",
    local: "São Paulo - SP",
  },
  {
    title: "Técnico de Suporte de TI",
    img: "/res/vagas/2.png",
    desc: "Estamos à procura de um Técnico de Suporte de TI experiente para fornecer soluções eficazes! Se você tem habilidades técnicas sólidas e deseja trabalhar em um ambiente dinâmico.",
    tipo: "Híbrido",
    periodo: "Integral",
    local: "São Paulo - SP",
  },
  {
    title: "Especialista em Atendimento ao Cliente",
    img: "/res/vagas/3.png",
    desc: "Faça a diferença como Especialista em Atendimento ao Cliente! Se você tem mentalidade focada no cliente, excelentes habilidades de comunicação e capacidade de resolver problemas de forma eficaz.",
    tipo: "Remoto",
    periodo: "Flexível",
    local: "Brasil",
  },
];

export default function Vagas() {
  return (
    <>
      <Header active="Vagas" />

      <section className="vagas-hero">
        <div className="vagas-hero-content">
          <span className="vagas-badge">Oportunidades</span>
          <h1>Encontre sua <span className="vagas-destaque">próxima oportunidade</span></h1>
          <p>Estamos conectando talentos às melhores empresas. Confira as vagas disponíveis e candidate-se.</p>
        </div>
      </section>

      <section className="vagas-list">
        <div className="vagas-list-inner">
          {vagas.map((vaga, index) => (
            <div className="vagas-card" key={index}>
              <div className="vagas-card-img">
                <img src={vaga.img} alt={vaga.title} />
              </div>
              <div className="vagas-card-body">
                <h3>{vaga.title}</h3>
                <div className="vagas-tags">
                  <span className="vagas-tag">{vaga.tipo}</span>
                  <span className="vagas-tag">{vaga.periodo}</span>
                  <span className="vagas-tag">{vaga.local}</span>
                </div>
                <p>{vaga.desc}</p>
                <button className="vagas-btn">Candidatar-se</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="vagas-cta">
        <div className="vagas-cta-inner">
          <h2>Não encontrou a vaga ideal?</h2>
          <p>Envie seu currículo para nosso banco de talentos e entraremos em contato quando surgir a oportunidade certa.</p>
          <Link href="/contatos" className="vagas-btn vagas-btn-outline">Enviar Currículo</Link>
        </div>
      </section>
    </>
  );
}
