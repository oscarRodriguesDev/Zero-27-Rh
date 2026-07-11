export interface BlogPostMeta {
  title: string;
  slug: string;
  content: string;
  image?: {
    imgix_url?: string;
    url?: string;
  };
  excerpt?: string;
  author?: string;
  published_at?: string;
  categories?: string;
  tags?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  type: string;
  metadata: BlogPostMeta;
  created_at: string;
  published_at: string;
  modified_at: string;
}

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  metadata: {
    title: string;
    slug: string;
    excerpt?: string;
    image?: {
      imgix_url?: string;
      url?: string;
    };
    author?: string;
    published_at?: string;
    categories?: string;
  };
  created_at: string;
  published_at: string;
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}
