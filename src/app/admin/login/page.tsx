"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao fazer login.");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/res/icone-zero.png" alt="Zero27RH" />
        </div>
        <h1>Painel Administrativo</h1>
        <p className="admin-login-subtitle">Faça login para gerenciar o conteúdo.</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          padding: 24px;
        }

        .admin-login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 48px 32px;
          text-align: center;
        }

        .admin-login-logo {
          margin-bottom: 24px;
        }

        .admin-login-logo img {
          width: 72px;
          height: auto;
          border-radius: 25%;
          border: 2px solid rgba(255, 205, 4, 0.3);
          padding: 4px;
        }

        .admin-login-card h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px;
          color: #fff;
        }

        .admin-login-subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 32px;
        }

        .admin-field {
          text-align: left;
          margin-bottom: 20px;
        }

        .admin-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .admin-field input {
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s;
        }

        .admin-field input:focus {
          border-color: #ffcd04;
        }

        .admin-field input::placeholder {
          color: rgba(255, 255, 255, 0.2);
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

        .admin-btn {
          width: 100%;
          padding: 13px 24px;
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
      `}</style>
    </div>
  );
}
