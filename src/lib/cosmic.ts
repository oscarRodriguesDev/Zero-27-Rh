import { createBucketClient } from "@cosmicjs/sdk";
import type { BlogPost, BlogPostListItem, CosmicResponse } from "@/types/blog";

const bucketSlug = process.env.COSMIC_BUCKET_SLUG || "";
const readKey = process.env.COSMIC_READ_KEY || "";

if (!bucketSlug || !readKey) {
  console.warn(
    "[Cosmic] Variáveis de ambiente COSMIC_BUCKET_SLUG e COSMIC_READ_KEY não configuradas."
  );
}

const cosmic = createBucketClient({
  bucketSlug,
  readKey,
});

const POST_TYPE = "posts";
const POST_PROPS = "title,slug,metadata,created_at,published_at";
const POST_LIST_PROPS =
  "title,slug,metadata.title,metadata.slug,metadata.excerpt,metadata.image,metadata.author,metadata.published_at,metadata.categories,created_at,published_at";
const SINGLE_POST_PROPS =
  "title,slug,metadata.title,metadata.slug,metadata.content,metadata.image,metadata.excerpt,metadata.author,metadata.published_at,metadata.categories,metadata.tags,created_at,published_at,modified_at";

function isNotFoundError(error: unknown): boolean {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    return (
      err.status === 404 ||
      (typeof err.message === "string" &&
        err.message.toLowerCase().includes("no objects found"))
    );
  }
  return false;
}

export async function getPosts(): Promise<BlogPostListItem[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: POST_TYPE })
      .props(POST_LIST_PROPS)
      .sort("-created_at")
      .limit(100);

    return (objects as unknown as BlogPostListItem[]) || [];
  } catch (error) {
    if (!isNotFoundError(error)) {
      console.error("[Cosmic] Erro ao buscar posts:", error);
    }
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: POST_TYPE, slug })
      .props(SINGLE_POST_PROPS);

    return (object as unknown as BlogPost) || null;
  } catch (error) {
    if (!isNotFoundError(error)) {
      console.error(`[Cosmic] Erro ao buscar post "${slug}":`, error);
    }
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: POST_TYPE })
      .props("slug")
      .limit(1000);

    return (objects as unknown as { slug: string }[]).map(
      (obj) => obj.slug
    );
  } catch (error) {
    if (!isNotFoundError(error)) {
      console.error("[Cosmic] Erro ao buscar slugs:", error);
    }
    return [];
  }
}
