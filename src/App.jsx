import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "random-things-blog-v3";

const starterPosts = [
  {
    id: crypto.randomUUID(),
    title: "Why Small Cafes Matter",
    type: "Cafe Review",
    rating: 4,
    date: new Date().toISOString().slice(0, 10),
    image: "",
    body: "A good cafe is more than coffee. It becomes a place to read, think, meet people, and notice the city around you.",
  },
  {
    id: crypto.randomUUID(),
    title: "A Random Thought on Reading",
    type: "Op-Ed",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    image: "",
    body: "Books are one of the few places where you can sit with another mind for hours without interruption.",
  },
];

const postTypes = ["All", "Op-Ed", "Cafe Review", "Book Review", "Movie Review", "Travel Note", "Journal", "Other"];

function emptyPost() {
  return {
    id: crypto.randomUUID(),
    title: "",
    type: "Journal",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    image: "",
    body: "",
  };
}

export default function App() {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : starterPosts;
    } catch {
      return starterPosts;
    }
  });

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(emptyPost());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase();
    return posts
      .filter((post) => filter === "All" || post.type === filter)
      .filter((post) => [post.title, post.type, post.body, post.date].some((field) => String(field).toLowerCase().includes(q)))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts, query, filter]);

  function startNewPost() {
    setDraft(emptyPost());
    setEditing(true);
  }

  function startEdit(post) {
    setDraft({ ...post });
    setEditing(true);
  }

  function savePost() {
    if (!draft.title.trim() && !draft.body.trim()) return;
    const finishedPost = { ...draft, title: draft.title.trim() || "Untitled" };
    const alreadyExists = posts.some((post) => post.id === draft.id);

    if (alreadyExists) {
      setPosts(posts.map((post) => (post.id === draft.id ? finishedPost : post)));
    } else {
      setPosts([finishedPost, ...posts]);
    }

    setEditing(false);
    setDraft(emptyPost());
  }

  function deletePost(id) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setDraft((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  }

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div>
          <h1 style={styles.title}>Random Things</h1>
          <p style={styles.subtitle}>A personal place for op-eds, cafe reviews, reading notes, lists, opinions, and whatever else you want to remember.</p>
        </div>
        <button style={styles.primaryButton} onClick={startNewPost}>+ New post</button>
      </header>

      <section style={styles.controls}>
        <input style={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts..." />
        <select style={styles.select} value={filter} onChange={(e) => setFilter(e.target.value)}>
          {postTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </section>

      <main style={styles.layout}>
        <section style={styles.posts}>
          {filteredPosts.map((post) => (
            <article key={post.id} style={styles.card}>
              {post.image && <img src={post.image} alt="Post" style={styles.postImage} />}
              <div style={styles.cardBody}>
                <div style={styles.meta}>{post.type} · {post.date} {post.rating > 0 ? `· ${post.rating}/5` : ""}</div>
                <h2 style={styles.postTitle}>{post.title}</h2>
                <p style={styles.bodyText}>{post.body}</p>
                <div style={styles.buttonRow}>
                  <button style={styles.secondaryButton} onClick={() => startEdit(post)}>Edit</button>
                  <button style={styles.ghostButton} onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && <div style={styles.card}>No posts found.</div>}
        </section>

        <aside style={styles.sidebar}>
          <div style={styles.card}>
            <h3>Stats</h3>
            <p><strong>{posts.length}</strong> posts</p>
            <p><strong>{new Set(posts.map((post) => post.type)).size}</strong> categories used</p>
          </div>

          <div style={styles.card}>
            <h3>Ideas</h3>
            <p>Best cafes for reading</p>
            <p>Books that changed your mind</p>
            <p>Movie reviews in one paragraph</p>
            <p>Random thoughts you do not want to lose</p>
          </div>
        </aside>
      </main>

      {editing && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <div style={styles.modalTop}>
              <h2>{posts.some((post) => post.id === draft.id) ? "Edit post" : "New post"}</h2>
              <button style={styles.ghostButton} onClick={() => setEditing(false)}>✕</button>
            </div>

            <input style={styles.input} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Title" />

            <div style={styles.formGrid}>
              <select style={styles.select} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
                {postTypes.filter((type) => type !== "All").map((type) => <option key={type}>{type}</option>)}
              </select>
              <input style={styles.input} type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
              <select style={styles.select} value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}>
                <option value={0}>No rating</option>
                {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating}/5</option>)}
              </select>
            </div>

            <label style={styles.uploadBox}>
              Add photo
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>

            {draft.image && <img src={draft.image} alt="Draft" style={styles.previewImage} />}

            <textarea style={styles.textarea} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder="Write anything here..." />

            <div style={styles.buttonRow}>
              <button style={styles.primaryButton} onClick={savePost}>Save post</button>
              <button style={styles.secondaryButton} onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f4f5",
    color: "#18181b",
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "32px",
  },
  hero: {
    maxWidth: "1100px",
    margin: "0 auto 24px",
    background: "white",
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: { fontSize: "48px", margin: "0 0 12px", letterSpacing: "-0.04em" },
  subtitle: { fontSize: "18px", color: "#52525b", maxWidth: "720px", margin: 0, lineHeight: 1.6 },
 controls: {
  maxWidth: "1100px",
  margin: "0 auto 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "12px",
},

layout: {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
  alignItems: "start",
},
  posts: { display: "grid", gap: "18px" },
  sidebar: { display: "grid", gap: "18px" },
  card: { background: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)", overflow: "hidden" },
  cardBody: { padding: "24px" },
  postImage: { width: "100%", height: "280px", objectFit: "cover", display: "block" },
  previewImage: { width: "100%", maxHeight: "260px", objectFit: "cover", borderRadius: "18px" },
  meta: { color: "#71717a", fontSize: "14px", marginBottom: "10px" },
  postTitle: { margin: "0 0 12px", fontSize: "28px", letterSpacing: "-0.02em" },
  bodyText: { whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#3f3f46" },
  input: { width: "100%", boxSizing: "border-box", border: "1px solid #d4d4d8", borderRadius: "16px", padding: "14px 16px", fontSize: "16px" },
  select: { width: "100%", boxSizing: "border-box", border: "1px solid #d4d4d8", borderRadius: "16px", padding: "14px 16px", fontSize: "16px", background: "white" },
  textarea: { width: "100%", boxSizing: "border-box", border: "1px solid #d4d4d8", borderRadius: "16px", padding: "14px 16px", fontSize: "16px", minHeight: "220px", resize: "vertical", fontFamily: "inherit" },
  primaryButton: { border: 0, background: "#18181b", color: "white", borderRadius: "16px", padding: "14px 18px", fontSize: "16px", cursor: "pointer" },
  secondaryButton: { border: 0, background: "#e4e4e7", color: "#18181b", borderRadius: "16px", padding: "12px 16px", fontSize: "15px", cursor: "pointer" },
  ghostButton: { border: 0, background: "transparent", color: "#52525b", borderRadius: "16px", padding: "12px 16px", fontSize: "15px", cursor: "pointer" },
  buttonRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "18px" },
  modalBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  modal: { background: "white", borderRadius: "28px", padding: "28px", width: "100%", maxWidth: "760px", maxHeight: "90vh", overflow: "auto", display: "grid", gap: "16px" },
  modalTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" },
  uploadBox: { border: "1px dashed #a1a1aa", background: "#fafafa", padding: "18px", textAlign: "center", borderRadius: "18px", cursor: "pointer", color: "#52525b" },
};
