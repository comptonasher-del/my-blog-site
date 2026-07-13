import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "./lib/supabase";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
    excerpt: "", 
    author: "",
    Slug: "",
authorImage: "",
authorDescription: "",
featured: false,
  };
}
function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
function mapSupabasePost(row) {
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
    type: row.category || "Journal",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    image: row.image_url || "",
  };
}

function MarkdownContent({ children }) {
  return (
    <div style={styles.markdownBody} className="article-body">
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
  const [currentView, setCurrentView] = useState("home");

  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);


useEffect(() => {
  document.title = siteConfig.site_title || "From One to the Next";
}, [siteConfig.site_title]);
  const [settingsDraft, setSettingsDraft] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(emptyPost());

  const [activeCategory, setActiveCategory] = useState("Home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
  let filtered = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (activeCategory === "Essays") {
    filtered = filtered.filter(
      (post) => post.type === "Op-Ed"
    );
  }

  if (activeCategory === "Reviews") {
    filtered = filtered.filter(
      (post) => post.type === "Book Review"
    );
  }

  if (activeCategory === "Journal") {
    filtered = filtered.filter(
      (post) => post.type === "Journal"
    );
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();

    filtered = filtered.filter((post) =>
      post.title?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query) ||
      post.body?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query)
    );
  }

  return filtered;

}, [posts, activeCategory, searchQuery]);
const featuredPost =
  visiblePosts.find((post) => post.featured) || visiblePosts[0];

const remainingPosts = visiblePosts.filter(
  (post) => post.id !== featuredPost?.id
);

 const selectedPost = posts.find(
  (post) => String(post.slug) === String(postId) || String(post.id) === String(postId)
);
const [cardHovered, setCardHovered] = useState(null);
useEffect(() => {
  if (isPostPage && selectedPost?.title) {
    document.title = `${selectedPost.title} | From One to the Next`;
  } else {
    document.title = siteConfig.site_title || "From One to the Next";
  }
}, [isPostPage, selectedPost?.title, siteConfig.site_title]);
useEffect(() => {
  if (isPostPage && selectedPost?.id && !session) {
    incrementPostMetric(selectedPost.id, "views");
  }
}, [isPostPage, selectedPost?.id, session]);
async function incrementPostMetric(postId, field) {
  const { error } = await supabase.rpc("increment_post_metric", {
    post_id_input: postId,
    field_name_input: field,
  });

  if (error) {
    console.error("Error updating metric:", error);
  }
}
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
  excerpt: draft.excerpt || "",
 author: draft.author || "Asher Compton",
slug: makeSlug(draft.title || "untitled"),
author_image: draft.authorImage || "",
author_description: draft.authorDescription || "",
featured: draft.featured || false,
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
         <a href="/" style={styles.articleMastheadLink}>
  From One to the Next
</a>

       <article style={styles.articlePage}>
  <div style={styles.articleHeader}>
    <div style={styles.articleDate}>
      {selectedPost.date}
    </div>

    <h1 style={styles.articleTitle}>
      {selectedPost.title}
    </h1>

    {selectedPost.image && (
      <img
        src={selectedPost.image}
        alt={selectedPost.title}
        style={styles.articleHeroImage}
      />
    )}
<div style={styles.articleMetaRow}>
  <AuthorBlock post={selectedPost} />
 <ShareButton post={selectedPost} incrementPostMetric={incrementPostMetric} />
</div>
{session && <AdminPostMetrics post={selectedPost} />}
  </div>

  <div
    className="article-body"
    style={styles.markdownBody}
    dangerouslySetInnerHTML={{ __html: selectedPost.body || "" }}
  />
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
  {["Home", "Journal", "Essays", "Reviews"].map((item) => (
    <button
      key={item}
      style={{
        ...styles.navLink,
        ...(activeCategory === item ? styles.navLinkActive : {}),
      }}
     onClick={() => {
  setCurrentView("home");
  setActiveCategory(item);
}}
    >
      {item}
    </button>
  ))}

 <button
  style={styles.navLink}
  onClick={() => setCurrentView("about")}
>
  About
</button>

<button
  style={styles.searchButton}
  onClick={() => setSearchOpen(!searchOpen)}
>
  🔍
</button>

</nav>

{searchOpen && (
  <div style={styles.searchWrapper}>
    <input
      autoFocus
      style={styles.searchInput}
      placeholder="Search articles..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <button
      style={styles.closeSearch}
      onClick={() => {
        setSearchQuery("");
        setSearchOpen(false);
      }}
    >
      ✕
    </button>
  </div>
)}

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
{currentView === "about" ? (
  <article style={styles.aboutcard}>
    <h1>About</h1>

    <div style={styles.markdownBody}>
      <ReactMarkdown>
        {siteConfig.about_page || "No about page has been written yet."}
      </ReactMarkdown>
    </div>
  </article>
) : (

        <section style={styles.posts}>
{loadingPosts && (
  <div style={styles.card}>Loading articles...</div>
)}
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
  incrementPostMetric={incrementPostMetric}
              isAdmin={isAdminPage && !!session}
              onEdit={startEdit}
              onDelete={deletePost}
            />
          ))}

          {!loadingPosts && visiblePosts.length === 0 && (
  <div style={styles.card}>No posts found.</div>
)}
        </section>
         )}

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

<footer style={styles.footer}>
  <p>© {new Date().getFullYear()} From One to the Next. All rights reserved.</p>
</footer>

    </div>
  );
}
function ShareButton({ post, incrementPostMetric }) {
  const [open, setOpen] = useState(false);
  const postUrl = `${window.location.origin}/post/${post.slug || post.id}`;

  async function trackShare() {
    if (incrementPostMetric) {
      await incrementPostMetric(post.id, "shares");
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(postUrl);
    await trackShare();
    alert("Link copied!");
    setOpen(false);
  }

  return (
    <div style={styles.shareWrapper}>
      <button style={styles.shareButton} onClick={() => setOpen(!open)}>
        Share ▾
      </button>

      {open && (
        <div style={styles.shareMenu}>
          <button style={styles.shareMenuItem} onClick={copyLink}>
            Copy link
          </button>

          <a
            style={styles.shareMenuItem}
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Read this article: ${postUrl}`)}`}
            onClick={trackShare}
          >
            Email
          </a>

          <a
            style={styles.shareMenuItem}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noreferrer"
            onClick={trackShare}
          >
            Facebook
          </a>
        </div>
      )}
    </div>
  );
}
function AdminPostMetrics({ post }) {
  return (
    <div style={styles.adminMetrics}>
      <span>{post.views || 0} views</span>
      <span>{post.readClicks || 0} read clicks</span>
      <span>{post.shares || 0} shares</span>
    </div>
  );
}
function AuthorBlock({ post }) {
  return (
    <div style={styles.authorBlock}>
      {post.authorImage && (
        <img
          src={post.authorImage}
          alt={post.author}
          style={styles.authorPhoto}
        />
      )}

      <div>
        <div style={styles.authorName}>
          Article by <span>{post.author || "Asher Compton"}</span>
        </div>

        {post.authorDescription && (
          <div style={styles.authorDescription}>
            {post.authorDescription}
          </div>
        )}
      </div>
    </div>
  );
}
function FeaturedArticle({ post, isAdmin, onEdit, onDelete }) {
  return (
    <article
  style={styles.featuredCard}
  onClick={() => {
    window.location.href = `/post/${post.slug || post.id}`;
  }}
>
      {post.image && (
        <img src={post.image} alt={post.title} style={styles.featuredImage} />
      )}

      <div style={styles.cardBody}>
        <div style={styles.featuredMeta}>{post.type}</div>

        <h2 style={styles.featuredTitle}>{post.title}</h2>

        <p style={styles.featuredDeck}>{post.excerpt || `${(post.body || "").slice(0, 220)}...`}</p>

      

        {isAdmin && <AdminPostButtons post={post} onEdit={onEdit} onDelete={onDelete} />}
      </div>
    </article>
  );
}

function ArticleCard({ post, isAdmin, onEdit, onDelete, incrementPostMetric }) {
const [hovered, setHovered] = useState(false);
  return (
  <article
  style={hovered ? styles.cardHover : styles.card}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  onClick={() => {
    incrementPostMetric(post.id, "read_clicks");
    window.location.href = `/post/${post.slug || post.id}`;
  }}
>
      {post.image && (
        <img src={post.image} alt={post.title} style={styles.postImage} />
      )}

      <div style={styles.cardBody}>
        <div style={styles.meta}>
          {post.type} · {post.date}
        </div>

        <h2 style={styles.postTitle}>{post.title}</h2>

        <p style={styles.bodyText}>{post.excerpt || `${(post.body || "").slice(0, 150)}...`}</p>

       <a
  href={`/post/${post.slug || post.id}`}
  style={styles.readLink}
  onClick={() => incrementPostMetric(post.id, "read_clicks")}
>
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
function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

return (
  <div style={styles.richTextEditor}>
    <div style={styles.editorToolbar}>
      <button
        type="button"
        style={styles.editorButton}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>

      <button
        type="button"
        style={styles.editorButton}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>

      <button
        type="button"
        style={styles.editorButton}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>

      <button
        type="button"
        style={styles.editorButton}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </button>

      <button
        type="button"
        style={styles.editorButton}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullets
      </button>

      <button
        type="button"
        style={styles.editorButton}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        Numbers
      </button>
    </div>

    <EditorContent editor={editor} />
  </div>
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
<input
  style={styles.input}
  value={draft.author || ""}
  onChange={(event) => updateDraft("author", event.target.value)}
  placeholder="Author name"
/>
<input
  style={styles.input}
  value={draft.authorImage || ""}
  onChange={(event) => updateDraft("authorImage", event.target.value)}
  placeholder="Author photo URL"
/>

<input
  style={styles.input}
  value={draft.authorDescription || ""}
  onChange={(event) => updateDraft("authorDescription", event.target.value)}
  placeholder="Author description, like Pastor, Frisco, Texas"
/>
<label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  <input
    type="checkbox"
    checked={draft.featured || false}
    onChange={(event) => updateDraft("featured", event.target.checked)}
  />
  Feature this article on the homepage
</label>
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
  style={{ ...styles.textarea, minHeight: "100px" }}
  value={draft.excerpt || ""}
  onChange={(event) => updateDraft("excerpt", event.target.value)}
  placeholder="Short homepage excerpt..."
/>
        <RichTextEditor
  value={draft.body}
  onChange={(html) => updateDraft("body", html)}
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
    padding: "0 0 40px",
  },
hero: {
  width: "100%",
  background: "#fffaf3",
  borderBottom: "1px solid #eadfce",
  padding: "24px 40px",
  boxSizing: "border-box",
  margin: "0 0 32px",
},

  title: {
    fontSize: "64px",
    lineHeight: 0.95,
    margin: "0 0 20px",
    letterSpacing: "-0.06em",
    fontWeight: 900,
    fontFamily: "'Libre Baskerville', Georgia, serif",
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
aboutCard: {
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  padding: "32px",
  boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
  overflow: "hidden",
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
  padding: "56px 24px",
},
articlePage: {
  marginTop: "24px",
  background: "transparent",
  border: "none",
  boxShadow: "none",
},
articleMetaRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "40px",
},
articleMastheadLink: {
  display: "block",
  textAlign: "center",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "22px",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#1f2933",
  textDecoration: "none",
  marginBottom: "40px",
},
richTextEditor: {
  minHeight: "260px",
  border: "1px solid #d4d4d8",
  borderRadius: "16px",
  padding: "18px",
  fontSize: "18px",
  lineHeight: 1.7,
  background: "white",
},
articleHeader: {
  marginBottom: "48px",
},

articleDate: {
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "18px",
},

articleAuthor: {
  textAlign: "center",
  marginTop: "24px",
  marginBottom: "48px",
  fontSize: "16px",
  color: "#4b5563",
},
authorBlock: {
  display: "flex",
  alignItems: "center",
  gap: "14px",
},
authorPhoto: {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  objectFit: "cover",
},

authorName: {
  fontSize: "16px",
  fontWeight: 600,
  color: "#374151",
},

authorDescription: {
  marginTop: "4px",
  fontSize: "15px",
  color: "#6b7280",
},
articleHeroImage: {
  width: "100%",
  maxHeight: "520px",
  objectFit: "cover",
  margin: "32px auto 24px",
  display: "block",
},
articleTitle: {
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "64px",
  lineHeight: 1.05,
  fontWeight: 700,
  letterSpacing: "-0.045em",
  textAlign: "center",
  maxWidth: "980px",
  margin: "0 auto 36px",
  color: "#1f2933",
},
adminMetrics: {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
  maxWidth: "760px",
  margin: "-24px auto 40px",
  padding: "12px 0",
  borderTop: "1px solid #e5e7eb",
  borderBottom: "1px solid #e5e7eb",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: 600,
},
editorToolbar: {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "12px",
  paddingBottom: "12px",
  borderBottom: "1px solid #e5e7eb",
},

editorButton: {
  border: "1px solid #d4d4d8",
  background: "#fafafa",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "14px",
  cursor: "pointer",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
    alignItems: "center",
    background: "#fffaf3",
    border: "1px solid #eadfce",
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
   cursor: "pointer",
transition: "transform 0.15s ease, box-shadow 0.15s ease",
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
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "52px",
    fontWeight: "800",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    margin: "12px 0 16px",
    color: "#18181b",
  },

  featuredDeck: {
  fontFamily: "Georgia, serif",
  fontSize: "16px",
  marginBottom: "20px",
  fontStyle: "italic",
  color: "#5f6368",
  lineHeight: 1.7,
},
featuredCardHover: {
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "32px",
  alignItems: "center",
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  padding: "32px",
  boxShadow: "0 28px 70px rgba(31,41,51,0.12)",
  cursor: "pointer",
  transform: "translateY(-4px)",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
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

searchButton: {
  background: "transparent",
  border: 0,
  cursor: "pointer",
  fontSize: "18px",
  padding: "0 4px",
},

searchWrapper: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginTop: "18px",
},

searchInput: {
  width: "100%",
  maxWidth: "420px",
  padding: "12px 18px",
  borderRadius: "999px",
  border: "1px solid #d4d4d8",
  fontSize: "16px",
  background: "#ffffff",
  outline: "none",
},

closeSearch: {
  border: 0,
  background: "transparent",
  cursor: "pointer",
  fontSize: "18px",
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
  boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
  overflow: "hidden",
  height: "fit-content",
  cursor: "pointer",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
},

  cardBody: {
    padding: "24px",
  },
cardHover: {
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  boxShadow: "0 24px 60px rgba(31,41,51,0.12)",
  overflow: "hidden",
  height: "fit-content",
  cursor: "pointer",
  transform: "translateY(-3px)",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
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
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontWeight: "800",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    color: "#1b2538",
  },

  bodyText: {
    whiteSpace: "pre-wrap",
fontFamily: "Georgia, serif",
  fontSize: "15px",
  lineHeight: 1.55,
  color: "#6b7280",
  margin: "0 0 14px",
  },

  readLink: {
    color: "#18181b",
    fontWeight: "bold",
    textDecoration: "none",
  },

markdownBody: {
  fontFamily: "'Source Serif 4', Georgia, serif",
  fontSize: "22px",
  lineHeight: 1.75,
  color: "#111827",
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
shareWrapper: {
  position: "relative",
},
shareButton: {
  border: "1px solid #d4d4d8",
  background: "#fffaf3",
  color: "#1f2933",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
},

shareMenu: {
  position: "absolute",
  top: "44px",
  right: 0,
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  padding: "8px",
  display: "grid",
  gap: "4px",
  zIndex: 10,
},

shareMenuItem: {
  border: 0,
  background: "transparent",
  color: "#1f2933",
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  textAlign: "left",
  cursor: "pointer",
  whiteSpace: "nowrap",
},
};
