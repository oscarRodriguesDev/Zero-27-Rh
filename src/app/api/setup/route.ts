import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG || "";
const WRITE_KEY = process.env.COSMIC_WRITE_KEY || "";
const READ_KEY = process.env.COSMIC_READ_KEY || "";
const API_URL = `https://api.cosmicjs.com/v3/buckets/${BUCKET_SLUG}`;

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    // 1. Verifica se o Object Type já existe
    const checkRes = await fetch(`${API_URL}/object-types`, {
      headers: {
        Authorization: `Bearer ${WRITE_KEY}`,
      },
    });

    if (!checkRes.ok) {
      const errText = await checkRes.text();
      return NextResponse.json(
        { error: `Erro ao consultar object types: ${checkRes.status} - ${errText}` },
        { status: 500 }
      );
    }

    const checkData = await checkRes.json();
    const types = checkData?.object_types || [];
    const existing = types.find((t: { slug: string }) => t.slug === "posts");

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "O Object Type 'posts' já está configurado.",
      });
    }

    // 2. Cria o Object Type
    const body = {
      title: "Posts",
      slug: "posts",
      singular: "Post",
      metafields: [
        { key: "title", title: "Title", type: "text", required: true },
        { key: "slug", title: "Slug", type: "text", required: true },
        { key: "content", title: "Content", type: "textarea", required: true },
        { key: "excerpt", title: "Excerpt", type: "textarea", required: false },
        {
          key: "image",
          title: "Image",
          type: "file",
          required: false,
          media_validation_type: "image",
        },
        { key: "author", title: "Author", type: "text", required: false },
        {
          key: "published_at",
          title: "Published At",
          type: "date",
          required: false,
        },
        {
          key: "categories",
          title: "Categories",
          type: "text",
          required: false,
        },
        {
          key: "tags",
          title: "Tags",
          type: "text",
          required: false,
        },
      ],
    };

    const createRes = await fetch(`${API_URL}/object-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WRITE_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const createData = await createRes.json();

    if (!createRes.ok) {
      return NextResponse.json(
        {
          error: `Erro ao criar object type: ${createRes.status}`,
          details: createData,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Object Type 'posts' criado com sucesso! Agora você pode publicar posts.",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao configurar Cosmic.";
    return NextResponse.json({ error: message, stack: error instanceof Error ? error.stack : undefined }, { status: 500 });
  }
}
