import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createBucketClient } from "@cosmicjs/sdk";
import { markdownToHtml, extractExcerpt } from "@/lib/markdown";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || "",
  readKey: process.env.COSMIC_READ_KEY || "",
  writeKey: process.env.COSMIC_WRITE_KEY || "",
});

const POST_TYPE = "posts";

function processContent(body: Record<string, unknown>) {
  // Se veio markdown, converte para HTML
  const contentMd = (body.content_markdown as string) || "";
  const contentHtml = (body.content as string) || "";

  let content: string;
  let excerpt: string;

  if (contentMd && !contentHtml) {
    // Veio só markdown -> converte
    content = markdownToHtml(contentMd);
    excerpt =
      (body.excerpt as string) || extractExcerpt(contentMd);
  } else if (contentHtml) {
    // Veio HTML diretamente -> usa como está
    content = contentHtml;
    excerpt =
      (body.excerpt as string) || extractExcerpt(contentHtml);
  } else if (contentMd) {
    // Veio markdown + html -> markdown tem prioridade
    content = markdownToHtml(contentMd);
    excerpt =
      (body.excerpt as string) || extractExcerpt(contentMd);
  } else {
    content = "";
    excerpt = "";
  }

  return { content, excerpt };
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const response = await cosmic.objects
      .find({ type: POST_TYPE })
      .props("title,slug,metadata,created_at,published_at,modified_at")
      .sort("-created_at");

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao buscar posts.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Campos obrigatórios: title, slug, e conteúdo (content ou content_markdown)." },
        { status: 400 }
      );
    }

    if (!body.content && !body.content_markdown) {
      return NextResponse.json(
        { error: "Forneça o conteúdo em 'content' (HTML) ou 'content_markdown' (Markdown)." },
        { status: 400 }
      );
    }

    const { content, excerpt } = processContent(body);

    const response = await cosmic.objects.insertOne({
      type: POST_TYPE,
      title: body.title,
      slug: body.slug,
      metadata: {
        title: body.title,
        slug: body.slug,
        content,
        excerpt,
        image: body.image || null,
        author: body.author || "Oscar",
        published_at: body.published_at || new Date().toISOString(),
        categories: body.categories || "",
        tags: body.tags || "",
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao criar post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
