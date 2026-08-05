export function emptyPost() {
  return {
    id: crypto.randomUUID(),
    title: "",
    type: "Journal",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    image: "",
    body: "",
    excerpt: "",
    author: "",
    Slug: "",
    authorImage: "",
    authorDescription: "",
    featured: false,
    featuredHome: false,
  };
}

export function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function mapSupabasePost(row) {
  return {
    id: row.id,
    title: row.title || "Untitled",
    slug: row.slug || makeSlug(row.title || "untitled"),
    body: row.body || "",
    excerpt: row.excerpt || "",
    author: row.author || "Asher Compton",
    authorImage: row.author_image || "",
    authorDescription: row.author_description || "",
    views: row.views || 0,
    readClicks: row.read_clicks || 0,
    shares: row.shares || 0,
    featured: row.featured || false,
    featuredHome: row.featured_home || false,
    type: row.category || "Journal",
    rating: 0,
    date:
      row.date ||
      new Date().toISOString().slice(0, 10),
    image: row.image_url || "",
  };
}