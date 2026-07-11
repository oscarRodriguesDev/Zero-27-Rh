"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PostItem {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  metadata?: {
    title?: string;
    published_at?: string;
  };
}

function getPostId(post: PostItem): string {
  const cosmicId = (post as unknown as Record<string, unknown>)["_id"];
  return post.id || (typeof cosmicId === "string" ? cosmicId : "") || post.slug;
}

interface Props {
  posts: PostItem[];
}

export default function AdminBlogTable({ posts }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erro ao excluir post.");
        return;
      }

      router.refresh();
    } catch {
      alert("Erro de conexão ao excluir post.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Slug</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const postId = getPostId(post);
            return (
            <tr key={postId}>
              <td className="admin-table-title">
                {post.metadata?.title || post.title}
              </td>
              <td className="admin-table-slug">{post.slug}</td>
              <td className="admin-table-date">
                {post.metadata?.published_at
                  ? new Date(post.metadata.published_at).toLocaleDateString(
                      "pt-BR"
                    )
                  : "-"}
              </td>
              <td className="admin-table-actions">
                <Link
                  href={`/admin/blog/${postId}/editar`}
                  className="admin-action-edit"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(postId)}
                  disabled={deletingId === postId}
                  className="admin-action-delete"
                >
                  {deletingId === postId ? "Excluindo..." : "Excluir"}
                </button>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>

      <style>{`
        .admin-action-delete {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #ff6b6b;
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.3);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-action-delete:hover {
          background: rgba(255, 60, 60, 0.2);
        }

        .admin-action-delete:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
