import Header from "@/components/Header";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/cosmic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post não encontrado | Zero27RH" };
  }

  return {
    title: `${post.metadata.title || post.title} | Zero27RH`,
    description:
      post.metadata.excerpt || "Leia o artigo completo no blog da Zero27RH.",
    openGraph: {
      title: post.metadata.title || post.title,
      description: post.metadata.excerpt,
      images: post.metadata.image?.imgix_url
        ? [{ url: post.metadata.image.imgix_url }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.metadata.title || post.title;
  const content = post.metadata.content || "";
  const imageUrl = post.metadata.image?.imgix_url;
  const categoriesRaw = post.metadata.categories || "";
  const categories = categoriesRaw
    ? categoriesRaw.split(",").map((c: string) => c.trim()).filter(Boolean)
    : [];

  return (
    <>
      <Header />

      <article className="blog-post">
        <div className="blog-post-header">
          {categories.length > 0 && (
            <div className="blog-post-categories">
              {categories.map((cat) => (
                <span key={cat} className="blog-post-tag">
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h1>{title}</h1>
          <div className="blog-post-meta">
            {post.metadata?.author && (
              <span className="blog-post-author">
                Por {post.metadata.author}
              </span>
            )}
            {post.metadata?.published_at && (
              <time className="blog-post-date">
                {formatDate(post.metadata.published_at)}
              </time>
            )}
          </div>
        </div>

        {imageUrl && (
          <div className="blog-post-image">
            <img
              src={`${imageUrl}?w=1200&auto=format,compression`}
              alt={title}
            />
          </div>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="blog-post-footer">
          <Link href="/blog" className="blog-post-back">
            &larr; Voltar para o Blog
          </Link>
        </div>
      </article>
    </>
  );
}
