import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

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

          <ThemeToggle />

          <form action="/api/auth/logout" method="POST" className="admin-logout-form">
            <button type="submit" className="admin-logout-btn">Sair</button>
          </form>
        </div>
      </header>

      <main className="admin-main">
        <h1>Bem-vindo, {session.name}!</h1>
        <p className="admin-main-subtitle">
          Gerencie os conteúdos do site Zero27RH.
        </p>

        <div className="admin-cards">
          <Link href="/admin/blog" className="admin-card">
            <div className="admin-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h3>Blog</h3>
            <p>Gerenciar posts do blog</p>
          </Link>
        </div>
      </main>

      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #0f0f0f;
          color: #fff;
        }

        .admin-topbar {
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .admin-topbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 60px;
          gap: 24px;
        }

        .admin-topbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
        }

        .admin-topbar-brand img {
          border-radius: 25%;
          border: 2px solid rgba(237, 233, 225, 0.4);
          padding: 2px;
        }

        .admin-topbar-nav {
          display: flex;
          gap: 8px;
        }

        .admin-topbar-link {
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .admin-topbar-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .admin-logout-form {
          margin: 0;
        }

        .admin-logout-btn {
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.2);
          border-radius: 8px;
          color: #ff6b6b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-logout-btn:hover {
          background: rgba(255, 60, 60, 0.2);
        }

        .admin-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px;
        }

        .admin-main h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .admin-main-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 40px;
        }

        .admin-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .admin-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s;
        }

        .admin-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 205, 4, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .admin-card-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 205, 4, 0.1);
          border-radius: 14px;
          color: #ffcd04;
        }

        .admin-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .admin-card p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
