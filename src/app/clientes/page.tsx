import Header from "@/components/Header";
import Link from "next/link";

const clients = [
  { img: "https://cheirinbao.com.br/storage/elementor/thumbs/cb-site-3-pp8xxocpddvdvasifuksw3vzedhvmg9wdds9vs9n1k.png", name: "Cafeteria Cheirin Bão", url: "https://cheirinbao.com.br/" },
  { img: "/res/clientes/logo-hiskra.png", name: "Hiskra Technologies", url: "https://www.hiskra.com.br" },
  { img: "/res/clientes/1.png", name: "Creative" },
  { img: "/res/clientes/2.png", name: "Artificial" },
  { img: "/res/clientes/3.png", name: "Infinity" },
  { img: "/res/clientes/4.png", name: "Bailey" },
  { img: "/res/clientes/7.png", name: "Global Tech" },
];

export default function Clientes() {
  return (
    <>
      <Header active="Clientes" />

      <section className="cli-hero">
        <div className="cli-hero-content">
          <span className="cli-badge">Nossos Clientes</span>
          <h1>Empresas que <span className="cli-destaque">confiam</span> na Zero27RH</h1>
          <p>Construímos parcerias sólidas com empresas de diversos segmentos, ajudando a encontrar os talentos certos para cada desafio.</p>
        </div>
      </section>

      <section className="cli-grid-section">
        <div className="cli-grid">
          {clients.map((client, index) => {
            const Card = (
              <div className="cli-card">
                <div className="cli-card-img">
                  <img src={client.img} alt={client.name} />
                </div>
                <p className="cli-card-name">{client.name}</p>
              </div>
            );

            return client.url ? (
              <a href={client.url} target="_blank" rel="noopener noreferrer" key={index} className="cli-card-link">
                {Card}
              </a>
            ) : (
              <div key={index}>{Card}</div>
            );
          })}
        </div>
      </section>

      <section className="cli-cta">
        <div className="cli-cta-inner">
          <h2>Sua empresa pode ser a próxima</h2>
          <p>Junte-se às empresas que já transformaram seus processos de seleção com a Zero27RH.</p>
          <Link href="/contatos" className="cli-btn">Seja Nosso Cliente</Link>
        </div>
      </section>
    </>
  );
}
