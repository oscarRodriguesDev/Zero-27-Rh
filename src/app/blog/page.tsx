import Header from "@/components/Header";
import Link from "next/link";
import { getPosts } from "@/lib/cosmic";

export const metadata = {
  title: "Blog | Zero27RH",
  description:
    "Fique por dentro das tendências de RH, recrutamento, seleção e gestão de talentos. Artigos e conteúdos exclusivos da Zero27RH.",
  keywords:
    "blog RH, recrutamento, seleção, talentos, carreira, recursos humanos, gestão de pessoas",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header active="Blog" />

      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-badge">Conteúdo</span>
          <h1>
            Blog da <span className="blog-destaque">Zero27RH</span>
          </h1>
          <p>
            Artigos, dicas e tendências sobre recrutamento, seleção e gestão
            de talentos para profissionais e empresas.
          </p>
        </div>
      </section>

      <section className="blog-list">
        <div className="blog-list-inner">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <p>Nenhum post publicado ainda. Volte em breve!</p>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id || post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                {post.metadata?.image?.imgix_url && (
                  <div className="blog-card-img">
                    <img
                      src={`${post.metadata.image.imgix_url}?w=600&auto=format,compression`}
                      alt={post.metadata.title || post.title}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="blog-card-body">
                  {post.metadata?.published_at && (
                    <span className="blog-card-date">
                      {formatDate(post.metadata.published_at)}
                    </span>
                  )}
                  <h3>{post.metadata.title || post.title}</h3>
                  {post.metadata?.excerpt && (
                    <p>{post.metadata.excerpt}</p>
                  )}
                  <span className="blog-card-link">
                    Ler artigo &rarr;
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="blog-cta">
        <div className="blog-cta-inner">
          <h2>Quer receber nossos conteúdos?</h2>
          <p>
            Cadastre-se para receber artigos, dicas e novidades do mundo de
            RH diretamente no seu e-mail.
          </p>
          <Link href="/contatos" className="blog-btn">
            Assinar Newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
