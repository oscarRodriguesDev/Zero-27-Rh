"use client";

import { useState } from "react";

export default function SetupCosmic() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSetup() {
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/setup", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Configurado com sucesso!");
        // Recarrega a página após 1.5s para mostrar os posts
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao configurar.");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão ao configurar o Cosmic JS.");
    }
  }

  return (
    <div className="admin-setup-cosmic">
      <div className="admin-setup-card">
        <div className="admin-setup-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <h3>Cosmic JS não configurado</h3>
        <p>
          O Object Type <strong>posts</strong> ainda não existe no seu bucket.
          Clique no botão abaixo para criar automaticamente a estrutura
          necessária no Cosmic JS.
        </p>

        {status === "success" && (
          <div className="admin-setup-success">{message}</div>
        )}
        {status === "error" && (
          <div className="admin-setup-error">{message}</div>
        )}

        <button
          onClick={handleSetup}
          disabled={status === "loading"}
          className="admin-btn"
        >
          {status === "loading"
            ? "Configurando..."
            : "Configurar Cosmic JS"}
        </button>
      </div>

      <style>{`
        .admin-setup-cosmic {
          display: flex;
          justify-content: center;
          padding: 60px 24px;
        }

        .admin-setup-card {
          max-width: 480px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 48px 32px;
        }

        .admin-setup-icon {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 205, 4, 0.1);
          border-radius: 50%;
          color: #ffcd04;
        }

        .admin-setup-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }

        .admin-setup-card p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          margin: 0;
        }

        .admin-setup-success {
          background: rgba(76, 217, 100, 0.1);
          border: 1px solid rgba(76, 217, 100, 0.3);
          color: #4cd964;
          font-size: 14px;
          padding: 10px 16px;
          border-radius: 8px;
          width: 100%;
        }

        .admin-setup-error {
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.3);
          color: #ff6b6b;
          font-size: 14px;
          padding: 10px 16px;
          border-radius: 8px;
          width: 100%;
        }

        .admin-btn {
          padding: 13px 32px;
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
