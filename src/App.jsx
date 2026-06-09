import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "./lib/supabase";

const POST_TYPES = [
  "Op-Ed",
  "Cafe Review",
  "Book Review",
  "Movie Review",
  "Travel Note",
  "Journal",
  "Other",
];

const DEFAULT_SITE_CONFIG = {
  site_title: "From One to the Next",
  site_tagline: "History, politics, culture, religion and everything else interesting. Here.",
  homepage_intro: "",
  about_page: "",
  footer_text: "",
  background_color: "#f7f4ef",
  card_background: "#fffaf3",
  text_color: "#1f2933",
  muted_text_color: "#6b6258",
  card_radius: 28,
};

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

function mapSupabasePost(row) {
  return {
    id: row.id,
    title: row.title || "Untitled",
    body: row.body || "",
    type: row.category || "Journal",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    image: row.image_url || "",
  };
}

function MarkdownContent({ children }) {
  return (
    <div style={styles.markdownBody}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 style={styles.markdownH1}>{children}</h1>,
          h2: ({ children }) => <h2 style={styles.markdownH2}>{children}</h2>,
          ul: ({ children }) => <ul style={styles.markdownList}>{children}</ul>,
          li: ({ children }) => <li style={styles.markdownListItem}>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote style={styles.markdownQuote}>{children}</blockquote>
          ),
        }}
      >
        {children || ""}
      </ReactMarkdown>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;
  const isAdminPage = path === "/admin";
  const isPostPage = path.startsWith("/post/");
  const postId = isPostPage ? path.split("/post/")[1] : null;

  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
  const [settingsDraft, setSettingsDraft] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(emptyPost());

  const [activeCategory, setActiveCategory] = useState("Home");
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadPosts();
    loadSiteConfig();
  }, []);

const visiblePosts = useMemo(() => {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (activeCategory === "Home") return sorted;
  if (activeCategory === "Essays") return sorted.filter((post) => post.type === "Op-Ed");
  if (activeCategory === "Book Reviews") return sorted.filter((post) => post.type === "Book Review");
  if (activeCategory === "Journal") return sorted.filter((post) => post.type === "Journal");

  return sorted;
}, [posts, activeCategory]);

const featuredPost = visiblePosts[0];
const remainingPosts = visiblePosts.slice(1);

  const selectedPost = posts.find((post) => String(post.id) === String(postId));

  async function loadPosts() {
    setLoadingPosts(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    setLoadingPosts(false);

    if (error) {
      console.error("Error loading posts:", error);
      return;
    }

    setPosts((data || []).map(mapSupabasePost));
  }

  async function loadSiteConfig() {
    const { data, error } = await supabase.from("site_config").select("*").limit(1);

    if (error) {
      console.error("Error loading site config:", error);
      return;
    }

    if (data && data.length > 0) {
      const loadedConfig = { ...DEFAULT_SITE_CONFIG, ...data[0] };
      setSiteConfig(loadedConfig);
      setSettingsDraft(loadedConfig);
    }
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error);
      alert("Login failed.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  function startNewPost() {
    setDraft(emptyPost());
    setEditing(true);
  }

  function startEdit(post) {
    setDraft({ ...post });
    setEditing(true);
  }

  async function savePost() {
    if (!draft.title.trim() && !draft.body.trim()) return;

    const postPayload = {
      title: draft.title.trim() || "Untitled",
      body: draft.body || "",
      category: draft.type || "Journal",
      image_url: draft.image || "",
    };

    const alreadyExists = posts.some((post) => post.id === draft.id);

    if (alreadyExists) {
      const { data, error } = await supabase
        .from("posts")
        .update(postPayload)
        .eq("id", draft.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating post:", error);
        alert("Could not update post.");
        return;
      }

      setPosts(posts.map((post) => (post.id === draft.id ? mapSupabasePost(data) : post)));
    } else {
      const { data, error } = await supabase
        .from("posts")
        .insert(postPayload)
        .select()
        .single();

      if (error) {
        console.error("Error saving post:", error);
        alert("Could not save post.");
        return;
      }

      setPosts([mapSupabasePost(data), ...posts]);
    }

    setEditing(false);
    setDraft(emptyPost());
  }

  async function deletePost(id) {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
      alert("Could not delete post.");
      return;
    }

    setPosts(posts.filter((post) => post.id !== id));
  }

  async function saveSiteSettings() {
    if (!settingsDraft) return;

    setSavingSettings(true);

    const { data, error } = await supabase
      .from("site_config")
      .update({
        site_title: settingsDraft.site_title,
        site_tagline: settingsDraft.site_tagline,
        homepage_intro: settingsDraft.homepage_intro,
        about_page: settingsDraft.about_page,
        footer_text: settingsDraft.footer_text,
        background_color: settingsDraft.background_color,
        card_background: settingsDraft.card_background,
        text_color: settingsDraft.text_color,
        muted_text_color: settingsDraft.muted_text_color,
        card_radius: settingsDraft.card_radius,
      })
      .eq("id", settingsDraft.id)
      .select()
      .single();

    setSavingSettings(false);

    if (error) {
      console.error("Error saving site settings:", error);
      alert("Could not save site settings.");
      return;
    }

    const updatedConfig = { ...DEFAULT_SITE_CONFIG, ...data };
    setSiteConfig(updatedConfig);
    setSettingsDraft(updatedConfig);
    alert("Site settings saved.");
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      alert("Could not upload image.");
      return;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);

    setDraft((prev) => ({
      ...prev,
      image: data.publicUrl,
    }));
  }

  if (isPostPage) {
    if (loadingPosts) {
      return (
        <div style={styles.page}>
          <div style={styles.card}>Loading post...</div>
        </div>
      );
    }

    if (!selectedPost) {
      return (
        <div style={styles.page}>
          <div style={styles.card}>
            <h1>Post not found</h1>
            <a href="/" style={styles.readLink}>
              ← Back to all posts
            </a>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.page}>
        <main style={styles.postPageLayout}>
          <a href="/" style={{ color: "#52525b" }}>
            ← Back to all posts
          </a>

          <article style={{ ...styles.card, marginTop: "24px" }}>
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                style={styles.postImage}
              />
            )}

            <div style={styles.cardBody}>
              <div style={styles.meta}>
                {selectedPost.type} · {selectedPost.date}
              </div>

              <h1 style={styles.title}>{selectedPost.title}</h1>

              <MarkdownContent>{selectedPost.body}</MarkdownContent>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div>
         <div style={styles.masthead}>
  <h1 style={styles.title}>{siteConfig.site_title}</h1>
  <p style={styles.subtitle}>{siteConfig.site_tagline}</p>

 <nav style={styles.nav}>
  {["Home", "Journal", "Essays", "Book Reviews"].map((item) => (
    <button
      key={item}
      style={{
        ...styles.navLink,
        ...(activeCategory === item ? styles.navLinkActive : {}),
      }}
      onClick={() => setActiveCategory(item)}
    >
      {item}
    </button>
  ))}

  <a href="/about" style={styles.navLink}>About</a>
</nav>
</div>
          {siteConfig.homepage_intro && (
            <p style={styles.homepageIntro}>{siteConfig.homepage_intro}</p>
          )}
        </div>

        {isAdminPage && (
          <div style={styles.adminHeaderControls}>
            {session ? (
              <>
                <button style={styles.primaryButton} onClick={startNewPost}>
                  + New post
                </button>

                <button style={styles.secondaryButton} onClick={signOut}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  style={styles.input}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.primaryButton} onClick={signIn}>
                  Sign in
                </button>
              </>
            )}
          </div>
        )}
      </header>

      <main style={styles.layout}>
        <section style={styles.posts}>
          {featuredPost && (
            <FeaturedArticle
              post={featuredPost}
              isAdmin={isAdminPage && !!session}
              onEdit={startEdit}
              onDelete={deletePost}
            />
          )}

          {remainingPosts.length > 0 && (
            <h2 style={styles.sectionHeading}>Latest Articles</h2>
          )}

          {remainingPosts.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
              isAdmin={isAdminPage && !!session}
              onEdit={startEdit}
              onDelete={deletePost}
            />
          ))}

          {visiblePosts.length === 0 && (
            <div style={styles.card}>No posts found.</div>
          )}
        </section>

        {isAdminPage && session && (
          <aside style={styles.sidebar}>
            {settingsDraft && (
              <SiteSettingsPanel
                settingsDraft={settingsDraft}
                setSettingsDraft={setSettingsDraft}
                savingSettings={savingSettings}
                saveSiteSettings={saveSiteSettings}
              />
            )}

            <AdminStats posts={posts} />
          </aside>
        )}
      </main>

      {editing && (
        <PostEditorModal
          draft={draft}
          setDraft={setDraft}
          posts={posts}
          savePost={savePost}
          closeEditor={() => setEditing(false)}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

function FeaturedArticle({ post, isAdmin, onEdit, onDelete }) {
  return (
    <article style={styles.featuredCard}>
      {post.image && (
        <img src={post.image} alt={post.title} style={styles.featuredImage} />
      )}

      <div style={styles.cardBody}>
        <div style={styles.featuredMeta}>{post.type}</div>

        <h2 style={styles.featuredTitle}>{post.title}</h2>

        <p style={styles.featuredDeck}>{(post.body || "").slice(0, 220)}...</p>

        <a href={`/post/${post.id}`} style={styles.readLink}>
          Read featured →
        </a>

        {isAdmin && <AdminPostButtons post={post} onEdit={onEdit} onDelete={onDelete} />}
      </div>
    </article>
  );
}

function ArticleCard({ post, isAdmin, onEdit, onDelete }) {
  return (
    <article style={styles.card}>
      {post.image && (
        <img src={post.image} alt={post.title} style={styles.postImage} />
      )}

      <div style={styles.cardBody}>
        <div style={styles.meta}>
          {post.type} · {post.date}
        </div>

        <h2 style={styles.postTitle}>{post.title}</h2>

        <p style={styles.bodyText}>{(post.body || "").slice(0, 150)}...</p>

        <a href={`/post/${post.id}`} style={styles.readLink}>
          Read article →
        </a>

        {isAdmin && <AdminPostButtons post={post} onEdit={onEdit} onDelete={onDelete} />}
      </div>
    </article>
  );
}

function AdminPostButtons({ post, onEdit, onDelete }) {
  return (
    <div style={styles.buttonRow}>
      <button
        style={styles.secondaryButton}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onEdit(post);
        }}
      >
        Edit
      </button>

      <button
        style={styles.ghostButton}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDelete(post.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

function SiteSettingsPanel({
  settingsDraft,
  setSettingsDraft,
  savingSettings,
  saveSiteSettings,
}) {
  function updateSetting(field, value) {
    setSettingsDraft({
      ...settingsDraft,
      [field]: value,
    });
  }

  return (
    <div style={styles.card}>
      <h3>Site Settings</h3>

      <input
        style={styles.input}
        value={settingsDraft.site_title || ""}
        onChange={(event) => updateSetting("site_title", event.target.value)}
        placeholder="Site title"
      />

      <textarea
        style={styles.textarea}
        value={settingsDraft.site_tagline || ""}
        onChange={(event) => updateSetting("site_tagline", event.target.value)}
        placeholder="Site tagline"
      />

      <textarea
        style={styles.textarea}
        value={settingsDraft.homepage_intro || ""}
        onChange={(event) => updateSetting("homepage_intro", event.target.value)}
        placeholder="Homepage intro"
      />

      <textarea
        style={styles.textarea}
        value={settingsDraft.about_page || ""}
        onChange={(event) => updateSetting("about_page", event.target.value)}
        placeholder="About page"
      />

      <input
        style={styles.input}
        value={settingsDraft.footer_text || ""}
        onChange={(event) => updateSetting("footer_text", event.target.value)}
        placeholder="Footer text"
      />

      <input
        style={styles.input}
        value={settingsDraft.background_color || ""}
        onChange={(event) => updateSetting("background_color", event.target.value)}
        placeholder="Background color"
      />

      <input
        style={styles.input}
        value={settingsDraft.card_background || ""}
        onChange={(event) => updateSetting("card_background", event.target.value)}
        placeholder="Card background"
      />

      <input
        style={styles.input}
        value={settingsDraft.text_color || ""}
        onChange={(event) => updateSetting("text_color", event.target.value)}
        placeholder="Text color"
      />

      <input
        style={styles.input}
        value={settingsDraft.muted_text_color || ""}
        onChange={(event) => updateSetting("muted_text_color", event.target.value)}
        placeholder="Muted text color"
      />

      <input
        style={styles.input}
        type="number"
        value={settingsDraft.card_radius || 28}
        onChange={(event) => updateSetting("card_radius", Number(event.target.value))}
        placeholder="Card radius"
      />

      <button
        style={styles.primaryButton}
        onClick={saveSiteSettings}
        disabled={savingSettings}
      >
        {savingSettings ? "Saving..." : "Save site settings"}
      </button>
    </div>
  );
}

function AdminStats({ posts }) {
  return (
    <>
      <div style={styles.card}>
        <h3>Stats</h3>
        <p>
          <strong>{posts.length}</strong> posts
        </p>
        <p>
          <strong>{new Set(posts.map((post) => post.type)).size}</strong>{" "}
          categories used
        </p>
      </div>

      <div style={styles.card}>
        <h3>Ideas</h3>
        <p>Best cafes for reading</p>
        <p>Books that changed your mind</p>
        <p>Movie reviews in one paragraph</p>
        <p>Random thoughts you do not want to lose</p>
      </div>
    </>
  );
}

function PostEditorModal({
  draft,
  setDraft,
  posts,
  savePost,
  closeEditor,
  handleImageUpload,
}) {
  const isExistingPost = posts.some((post) => post.id === draft.id);

  function updateDraft(field, value) {
    setDraft({
      ...draft,
      [field]: value,
    });
  }

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalTop}>
          <h2>{isExistingPost ? "Edit post" : "New post"}</h2>
          <button style={styles.ghostButton} onClick={closeEditor}>
            ✕
          </button>
        </div>

        <input
          style={styles.input}
          value={draft.title}
          onChange={(event) => updateDraft("title", event.target.value)}
          placeholder="Title"
        />

        <div style={styles.formGrid}>
          <select
            style={styles.select}
            value={draft.type}
            onChange={(event) => updateDraft("type", event.target.value)}
          >
            {POST_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <input
            style={styles.input}
            type="date"
            value={draft.date}
            onChange={(event) => updateDraft("date", event.target.value)}
          />

          <select
            style={styles.select}
            value={draft.rating}
            onChange={(event) => updateDraft("rating", Number(event.target.value))}
          >
            <option value={0}>No rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}/5
              </option>
            ))}
          </select>
        </div>

        <label style={styles.uploadBox}>
          Add photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        {draft.image && (
          <img src={draft.image} alt="Draft" style={styles.previewImage} />
        )}

        <textarea
          style={styles.textarea}
          value={draft.body}
          onChange={(event) => updateDraft("body", event.target.value)}
          placeholder="Write anything here..."
        />

        <div style={styles.buttonRow}>
          <button style={styles.primaryButton} onClick={savePost}>
            Save post
          </button>
          <button style={styles.secondaryButton} onClick={closeEditor}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ef",
    color: "#1f2933",
    fontFamily: "Inter, system-ui, sans-serif",
    padding: "40px 24px",
  },

  hero: {
    maxWidth: "1120px",
    margin: "0 auto 20px",
    background: "#fffaf3",
    border: "1px solid #eadfce",
    borderRadius: "0px",
    padding: "20px 32px",
    boxShadow: "0 24px 70px rgba(31, 41, 51, 0.08)",
  },

  title: {
    fontSize: "64px",
    lineHeight: 0.95,
    margin: "0 0 20px",
    letterSpacing: "-0.06em",
    fontWeight: 800,
  },

  subtitle: {
    fontSize: "20px",
    color: "#6b6258",
    maxWidth: "760px",
    margin: 0,
    lineHeight: 1.7,
  },

  homepageIntro: {
    marginTop: "12px",
    color: "#555",
    fontSize: "16px",
  },

  adminHeaderControls: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "18px",
  },

  postPageLayout: {
    maxWidth: "760px",
    margin: "0 auto",
  },

  layout: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "block",
  },

  posts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "28px",
  },

  sidebar: {
    display: "grid",
    gap: "18px",
    marginTop: "28px",
  },

  featuredCard: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "32px",
    alignItems: "center",
    background: "#fffaf3",
    border: "1px solid #eadfce",
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
  },

  featuredImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    display: "block",
    borderRadius: "18px",
  },

  featuredMeta: {
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#71717a",
  },

  featuredTitle: {
    fontSize: "52px",
    fontWeight: "800",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    margin: "12px 0 16px",
    color: "#18181b",
  },

  featuredDeck: {
    fontSize: "22px",
    lineHeight: 1.5,
    color: "#52525b",
    marginBottom: "24px",
  },
masthead: {
  textAlign: "center",
},

nav: {
  display: "flex",
  justifyContent: "center",
  gap: "24px",
  marginTop: "20px",
  paddingTop: "16px",
  borderTop: "1px solid #eadfce",
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
},

navLink: {
  color: "#1f2933",
  textDecoration: "none",
  background: "transparent",
  border: 0,
  cursor: "pointer",
  font: "inherit",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
},

navLinkActive: {
  borderBottom: "2px solid #1f2933",
  paddingBottom: "4px",
},

  sectionHeading: {
    gridColumn: "1 / -1",
    fontSize: "22px",
    margin: "8px 0 -8px",
    borderTop: "1px solid #eadfce",
    paddingTop: "24px",
  },

  card: {
    background: "#fffaf3",
    border: "1px solid #eadfce",
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
    overflow: "hidden",
  },

  cardBody: {
    padding: "24px",
  },

  postImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },

  previewImage: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "cover",
    borderRadius: "18px",
  },

  meta: {
    color: "#71717a",
    fontSize: "14px",
    marginBottom: "10px",
  },

  postTitle: {
    margin: "12px 0",
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    color: "#1b2538",
  },

  bodyText: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.7,
    color: "#3f3f46",
  },

  readLink: {
    color: "#18181b",
    fontWeight: "bold",
    textDecoration: "none",
  },

  markdownBody: {
    lineHeight: 1.8,
    fontSize: "18px",
    color: "#3f3f46",
  },

  markdownH1: {
    fontSize: "32px",
    margin: "24px 0 12px",
  },

  markdownH2: {
    fontSize: "24px",
    margin: "22px 0 10px",
  },

  markdownList: {
    paddingLeft: "24px",
    margin: "12px 0",
    listStyleType: "disc",
  },

  markdownListItem: {
    marginBottom: "6px",
  },

  markdownQuote: {
    borderLeft: "4px solid #d4d4d8",
    paddingLeft: "16px",
    color: "#52525b",
    fontStyle: "italic",
    margin: "18px 0",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d4d4d8",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "16px",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d4d4d8",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "16px",
    background: "white",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d4d4d8",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "16px",
    minHeight: "220px",
    resize: "vertical",
    fontFamily: "inherit",
  },

  primaryButton: {
    border: 0,
    background: "#18181b",
    color: "white",
    borderRadius: "16px",
    padding: "14px 18px",
    fontSize: "16px",
    cursor: "pointer",
  },

  secondaryButton: {
    border: 0,
    background: "#e4e4e7",
    color: "#18181b",
    borderRadius: "16px",
    padding: "12px 16px",
    fontSize: "15px",
    cursor: "pointer",
  },

  ghostButton: {
    border: 0,
    background: "transparent",
    color: "#52525b",
    borderRadius: "16px",
    padding: "12px 16px",
    fontSize: "15px",
    cursor: "pointer",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  modal: {
    background: "white",
    borderRadius: "28px",
    padding: "28px",
    width: "100%",
    maxWidth: "760px",
    maxHeight: "90vh",
    overflow: "auto",
    display: "grid",
    gap: "16px",
  },

  modalTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
  },

  uploadBox: {
    border: "1px dashed #a1a1aa",
    background: "#fafafa",
    padding: "18px",
    textAlign: "center",
    borderRadius: "18px",
    cursor: "pointer",
    color: "#52525b",
  },
};
