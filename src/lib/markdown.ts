import { marked } from "marked";

// Configuração segura do marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Converte Markdown para HTML.
 * Se o conteúdo já parece HTML (contém tags HTML), retorna como está.
 */
export function markdownToHtml(input: string): string {
  if (!input) return "";

  const trimmed = input.trim();

  // Se já contém tags HTML, retorna como está (é HTML)
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }

  // Converte Markdown para HTML
  return marked.parse(trimmed) as string;
}

/**
 * Extrai um excerpt (resumo) do conteúdo, removendo HTML.
 */
export function extractExcerpt(
  content: string,
  maxLength = 160
): string {
  if (!content) return "";

  // Remove tags HTML
  const text = content.replace(/<[^>]*>/g, "").trim();

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}
