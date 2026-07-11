"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovoPost() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content_markdown: "",
    content_html: "",
    excerpt: "",
    author: "Oscar",
    published_at: new Date().toISOString().slice(0, 10),
    image: "",
    categories: "",
    tags: "",
  });
  const [useHtml, setUseHtml] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  }

  function handlePreview() {
    const md = form.content_markdown;
    if (!md) {
      setPreviewHtml("<p style='color:#888'>Nenhum conteúdo para pré-visualizar.</p>");
      setShowPreview(true);
      return;
    }
    // Preview simples: converte quebras de linha para <br> e **texto** para <strong>
    let html = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");
    html = "<p>" + html + "</p>";
    setPreviewHtml(html);
    setShowPreview(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body: Record<string, unknown> = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        author: form.author,
        published_at: new Date(form.published_at).toISOString(),
        image: form.image ? { url: form.image } : null,
        categories: form.categories || "",
        tags: form.tags || "",
      };

      if (useHtml) {
        body.content = form.content_html;
      } else {
        body.content_markdown = form.content_markdown;
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao criar post.");
        return;
      }

      router.push("/admin/blog");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <Link href="/admin" className="admin-topbar-brand">
            <img src="/res/icone-zero.png" alt="Zero27RH" width={36} height={32} />
            <span>Admin</span>
          </Link>

          <nav className="admin-topbar-nav">
            <Link href="/admin/blog" className="admin-topbar-link">
              Posts
            </Link>
            <Link href="/" className="admin-topbar-link" target="_blank">
              Ver Site
            </Link>
          </nav>

          <form action="/api/auth/logout" method="POST" className="admin-logout-form">
            <button type="submit" className="admin-logout-btn">Sair</button>
          </form>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-blog-header">
          <div>
            <h1>Novo Post</h1>
            <p className="admin-main-subtitle">Crie um novo post para o blog.</p>
          </div>
          <Link href="/admin/blog" className="admin-btn-secondary">
            &larr; Voltar
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="title">Título *</label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="Título do post"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="slug">Slug *</label>
              <input
                id="slug"
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                placeholder="titulo-do-post"
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="excerpt">Resumo (opcional)</label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Breve descrição do post..."
              rows={2}
            />
          </div>

          {/* Alternância entre Markdown e HTML */}
          <div className="admin-editor-toggle">
            <button
              type="button"
              className={`admin-toggle-btn ${!useHtml ? "admin-toggle-active" : ""}`}
              onClick={() => setUseHtml(false)}
            >
              Editor Simples (Markdown)
            </button>
            <button
              type="button"
              className={`admin-toggle-btn ${useHtml ? "admin-toggle-active" : ""}`}
              onClick={() => setUseHtml(true)}
            >
              HTML Avançado
            </button>
          </div>

          {!useHtml ? (
            <div className="admin-field">
              <div className="admin-editor-header">
                <label htmlFor="content_markdown">Conteúdo *</label>
                <button
                  type="button"
                  className="admin-preview-btn"
                  onClick={handlePreview}
                >
                  Pré-visualizar
                </button>
              </div>
              <textarea
                id="content_markdown"
                value={form.content_markdown}
                onChange={(e) =>
                  setForm({ ...form, content_markdown: e.target.value })
                }
                required
                placeholder={`Escreva seu post em texto simples.

**Negrito**, *itálico*

## Título de seção

- Item de lista
- Outro item

Parágrafos são separados por linhas em branco.`}
                rows={16}
              />
              <p className="admin-field-hint">
                Use **negrito**, *itálico*, # Títulos, - listas. Parágrafos são separados por linhas em branco.
              </p>

              {showPreview && (
                <div className="admin-preview">
                  <div className="admin-preview-header">
                    <strong>Pré-visualização</strong>
                    <button
                      type="button"
                      className="admin-preview-close"
                      onClick={() => setShowPreview(false)}
                    >
                      Fechar
                    </button>
                  </div>
                  <div
                    className="admin-preview-content"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="admin-field">
              <label htmlFor="content_html">Conteúdo (HTML) *</label>
              <textarea
                id="content_html"
                value={form.content_html}
                onChange={(e) =>
                  setForm({ ...form, content_html: e.target.value })
                }
                required
                placeholder="<p>Conteúdo do post em HTML...</p>"
                rows={16}
                className="admin-textarea-mono"
              />
            </div>
          )}

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="author">Autor</label>
              <input
                id="author"
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Oscar"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="published_at">Data de publicação</label>
              <input
                id="published_at"
                type="date"
                value={form.published_at}
                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="image">URL da Imagem de capa</label>
            <input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://imgix.cosmicjs.com/..."
            />
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="categories">Categorias (separadas por vírgula)</label>
              <input
                id="categories"
                type="text"
                value={form.categories}
                onChange={(e) => setForm({ ...form, categories: e.target.value })}
                placeholder="RH, Carreira, Recrutamento"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="tags">Tags (separadas por vírgula)</label>
              <input
                id="tags"
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="talentos, vagas, entrevista"
              />
            </div>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <div className="admin-form-actions">
            <Link href="/admin/blog" className="admin-btn-secondary">
              Cancelar
            </Link>
            <button type="submit" className="admin-btn" disabled={loading}>
              {loading ? "Publicando..." : "Publicar Post"}
            </button>
          </div>
        </form>
      </main>

      <style>{`
        .admin-form {
          max-width: 800px;
        }

        .admin-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .admin-field textarea {
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s;
          resize: vertical;
          font-family: inherit;
        }

        .admin-field textarea:focus {
          border-color: #ffcd04;
        }

        .admin-textarea-mono {
          font-family: 'Fira Code', 'JetBrains Mono', monospace !important;
          font-size: 14px !important;
          line-height: 1.5;
        }

        .admin-field-hint {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
          margin: 6px 0 0;
        }

        /* Toggle Markdown / HTML */
        .admin-editor-toggle {
          display: flex;
          gap: 0;
          margin-bottom: 16px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          padding: 3px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .admin-toggle-btn {
          flex: 1;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-toggle-btn:hover {
          color: #fff;
        }

        .admin-toggle-active {
          background: rgba(255, 205, 4, 0.15);
          color: #ffcd04;
        }

        .admin-editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .admin-editor-header label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .admin-preview-btn {
          font-size: 12px;
          font-weight: 600;
          color: #ffcd04;
          background: rgba(255, 205, 4, 0.1);
          border: 1px solid rgba(255, 205, 4, 0.2);
          padding: 5px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-preview-btn:hover {
          background: rgba(255, 205, 4, 0.2);
        }

        .admin-preview {
          margin-top: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .admin-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 13px;
        }

        .admin-preview-close {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          background: none;
          border: none;
          cursor: pointer;
        }

        .admin-preview-close:hover {
          color: #fff;
        }

        .admin-preview-content {
          padding: 20px;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        .admin-preview-content h1,
        .admin-preview-content h2,
        .admin-preview-content h3 {
          margin: 16px 0 8px;
          color: #fff;
        }

        .admin-preview-content p {
          margin: 0 0 12px;
        }

        .admin-preview-content li {
          list-style-type: disc;
          margin-left: 20px;
          margin-bottom: 4px;
        }

        .admin-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .admin-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .admin-btn {
          padding: 12px 32px;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          background: linear-gradient(135deg, #ffcd04, #e6b800);
          color: #000;
          transition: all 0.3s;
        }

        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 205, 4, 0.3);
        }

        .admin-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .admin-error {
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.3);
          color: #ff6b6b;
          font-size: 14px;
          padding: 10px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        @media (max-width: 640px) {
          .admin-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
