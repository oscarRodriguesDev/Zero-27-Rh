import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createBucketClient } from "@cosmicjs/sdk";
import { markdownToHtml, extractExcerpt } from "@/lib/markdown";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || "",
  readKey: process.env.COSMIC_READ_KEY || "",
  writeKey: process.env.COSMIC_WRITE_KEY || "",
});

interface Props {
  params: Promise<{ id: string }>;
}

function processContent(body: Record<string, unknown>) {
  const contentMd = (body.content_markdown as string) || "";
  const contentHtml = (body.content as string) || "";

  let content: string;
  let excerpt: string;

  if (contentMd && !contentHtml) {
    content = markdownToHtml(contentMd);
    excerpt = (body.excerpt as string) || extractExcerpt(contentMd);
  } else if (contentHtml) {
    content = contentHtml;
    excerpt = (body.excerpt as string) || extractExcerpt(contentHtml);
  } else if (contentMd) {
    content = markdownToHtml(contentMd);
    excerpt = (body.excerpt as string) || extractExcerpt(contentMd);
  } else {
    content = "";
    excerpt = "";
  }

  return { content, excerpt };
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Campos obrigatórios: title, slug." },
        { status: 400 }
      );
    }

    const { content, excerpt } = processContent(body);

    const response = await cosmic.objects.updateOne(id, {
      type: "posts",
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

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao atualizar post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await cosmic.objects.deleteOne(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao excluir post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
