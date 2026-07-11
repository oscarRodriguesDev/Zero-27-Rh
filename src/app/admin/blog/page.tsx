import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPosts } from "@/lib/cosmic";
import SetupCosmic from "@/components/SetupCosmic";
import AdminBlogTable from "@/components/AdminBlogTable";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const posts = await getPosts();

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <Link href="/admin" className="admin-topbar-brand">
            <img src="/res/icone-zero.png" alt="Zero27RH" width={36} height={32} />
            <span>Admin</span>
          </Link>

          <nav className="admin-topbar-nav">
            <Link href="/admin" className="admin-topbar-link">
              Dashboard
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
            <h1>Posts do Blog</h1>
            <p className="admin-main-subtitle">
              Gerencie os posts publicados no site.
            </p>
          </div>
          <Link href="/admin/blog/novo" className="admin-btn-primary">
            + Novo Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <>
            <div className="admin-empty">
              <p>Nenhum post publicado ainda.</p>
              <Link href="/admin/blog/novo" className="admin-btn-primary">
                Criar primeiro post
              </Link>
            </div>
            <SetupCosmic />
          </>
        ) : (
          <AdminBlogTable posts={posts} />
        )}
      </main>

      <style>{`
        .admin-blog-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .admin-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          background: linear-gradient(135deg, #ffcd04, #e6b800);
          color: #000;
          border: none;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .admin-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 205, 4, 0.3);
        }

        .admin-empty {
          text-align: center;
          padding: 80px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .admin-empty p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .admin-table-wrap {
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .admin-table td {
          padding: 14px 16px;
          font-size: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .admin-table-title {
          font-weight: 500;
          color: #fff;
        }

        .admin-table-slug {
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
        }

        .admin-table-date {
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
          white-space: nowrap;
        }

        .admin-table-actions {
          display: flex;
          gap: 8px;
        }

        .admin-action-edit {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #ffcd04;
          text-decoration: none;
          border: 1px solid rgba(255, 205, 4, 0.3);
          border-radius: 6px;
          transition: all 0.2s;
        }

        .admin-action-edit:hover {
          background: rgba(255, 205, 4, 0.1);
        }
      `}</style>
    </div>
  );
}
