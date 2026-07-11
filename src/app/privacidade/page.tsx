import Header from "@/components/Header";
import Link from "next/link";

export default function Privacidade() {
  return (
    <>
      <Header />

      <section className="priv-hero">
        <div className="priv-hero-content">
          <span className="priv-badge">Legal</span>
          <h1>Política de <span className="priv-destaque">Privacidade</span></h1>
          <p>Saiba como a Zero27RH coleta, usa e protege seus dados pessoais.</p>
        </div>
      </section>

      <section className="priv-content">
        <div className="priv-content-inner">
          <div className="priv-card">
            <h2>1. Introdução</h2>
            <p>
              A Zero27RH está comprometida com a proteção da sua privacidade. Esta Política de Privacidade descreve como
              coletamos, usamos, armazenamos e protegemos seus dados pessoais quando você utiliza nossos serviços ou
              interage conosco.
            </p>
          </div>

          <div className="priv-card">
            <h2>2. Dados Coletados</h2>
            <p>Podemos coletar as seguintes informações pessoais:</p>
            <ul>
              <li>Nome completo e sobrenome</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Informações profissionais (currículo, histórico de carreira, formações)</li>
              <li>Mensagens enviadas através de nossos formulários</li>
            </ul>
          </div>

          <div className="priv-card">
            <h2>3. Uso dos Dados</h2>
            <p>Seus dados são utilizados para:</p>
            <ul>
              <li>Processar e responder às suas solicitações e consultas</li>
              <li>Conectar candidatos a oportunidades de trabalho</li>
              <li>Melhorar nossos serviços de recrutamento e seleção</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Enviar comunicações relacionadas aos nossos serviços (mediante autorização)</li>
            </ul>
          </div>

          <div className="priv-card">
            <h2>4. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a prestação dos
              nossos serviços (como divulgar currículos para empresas parceiras com vagas abertas) ou quando exigido por lei.
            </p>
          </div>

          <div className="priv-card">
            <h2>5. Segurança</h2>
            <p>
              Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra
              acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </div>

          <div className="priv-card">
            <h2>6. Seus Direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul>
              <li>Confirmar a existência de tratamento de seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </div>

          <div className="priv-card">
            <h2>7. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco:
            </p>
            <p>
              <strong>E-mail:</strong> contato@zero27rh.com.br<br />
              <strong>Telefone:</strong> (27) 99883-6800
            </p>
          </div>

          <div className="priv-card priv-card-muted">
            <p>
              Esta política está em constante atualização. Recomendamos que a revise periodicamente.
              <br />Última atualização: Julho de 2026.
            </p>
          </div>

          <div className="priv-back">
            <Link href="/" className="priv-btn">Voltar ao Início</Link>
          </div>
        </div>
      </section>
    </>
  );
}
