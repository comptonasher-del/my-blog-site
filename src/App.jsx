import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";
import styles from "./styles/styles";
import {
  emptyPost,
  makeSlug,
  mapSupabasePost,
} from "./utils/postHelpers";
import {
  ArticleCard,
  FeaturedArticle,
} from "./components/PostCards";
import {
  AuthorBlock,
  ShareButton,
} from "./components/ArticleDetails";
import Footer from "./components/Footer";
import {
  AdminPostMetrics,
  AdminStats,
  SiteSettingsPanel,
} from "./components/AdminPanels";
import PostEditorModal from "./components/PostEditorModal";
import AboutPage from "./components/AboutPage";
import SiteHeader from "./components/SiteHeader";
import ReadingProgress from "./components/ReadingProgress";
import { getReadingTime } from "./utils/readingTime";

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


export default function App() {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const initialView =
    params.get("view") === "about" ? "about" : "home";
  const initialCategory = params.get("category") || "Home";
  const isAdminPage = path === "/admin";
  const isPostPage = path.startsWith("/post/");
  const postId = isPostPage ? path.split("/post/")[1] : null;
  const [currentView, setCurrentView] = useState(initialView);

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

  const [activeCategory, setActiveCategory] = useState(
    initialView === "about" ? "About" : initialCategory
  );
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

  useEffect(() => {
    function handlePopState() {
      const nextParams = new URLSearchParams(
        window.location.search
      );

      const nextView =
        nextParams.get("view") === "about"
          ? "about"
          : "home";

      const nextCategory =
        nextParams.get("category") || "Home";

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      setCurrentView(nextView);
      setActiveCategory(
        nextView === "about" ? "About" : nextCategory
      );
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
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
const displayedPosts =
  activeCategory === "Home"
    ? remainingPosts.slice(0, 4)
    : remainingPosts;

const topicCards = [
  {
    label: "Journal",
    postType: "Journal",
    description:
      "Personal stories and reflections on following Jesus in everyday life.",
  },
  {
    label: "Essays",
    postType: "Op-Ed",
    description:
      "Thoughtful perspectives on faith, culture, and the questions shaping our lives.",
  },
  {
    label: "Reviews",
    postType: "Book Review",
    description:
      "Books, ideas, and culture considered through a Christian lens.",
  },
].map((topic) => {
  const matchingPost = posts.find(
    (post) => post.type === topic.postType && post.image
  );

  return {
    ...topic,
    image: matchingPost?.image || featuredPost?.image || "",
  };
});

 const selectedPost = posts.find(
  (post) => String(post.slug) === String(postId) || 
  String(post.id) === String(postId)
 );

const selectedPostReadTime = getReadingTime(
  selectedPost?.body || ""
);


const relatedPosts = selectedPost
  ? [
      ...posts.filter(
        (post) =>
          post.id !== selectedPost.id &&
          post.type === selectedPost.type
      ),
      ...posts.filter(
        (post) =>
          post.id !== selectedPost.id &&
          post.type !== selectedPost.type
      ),
    ].slice(0, 3)
  : [];

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
        <ReadingProgress />
	
	<SiteHeader
        currentView="article"
        siteConfig={siteConfig}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setCurrentView={setCurrentView}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAdminPage={isAdminPage}
        session={session}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        startNewPost={startNewPost}
        signIn={signIn}
        signOut={signOut}
      />

      <main style={styles.postPageLayout}>

       <article
 	 id="article-content"
         style={styles.articlePage}
       >	
  <div style={styles.articleHeader}>
    <div style={styles.articleDate}>
      {selectedPost.date} · {selectedPostReadTime} min read
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
    dangerouslySetInnerHTML={{
      __html: selectedPost.body || "",
    }}
  />

  <div style={styles.articleEnd}>
    <p style={styles.articleEndEyebrow}>
      From One to the Next
    </p>

    <h2 style={styles.articleEndTitle}>
      Keep the conversation going.
    </h2>

    <p style={styles.articleEndText}>
      Share this piece with someone who would value it, or
      subscribe for new writing from Christian young adults.
    </p>

    <div style={styles.articleEndActions}>
      <ShareButton
        post={selectedPost}
        incrementPostMetric={incrementPostMetric}
      />

      <button
        type="button"
        style={styles.articleEndSubscribeButton}
        onClick={() => {
          document
            .getElementById("subscribe")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }}
      >
        Subscribe
      </button>
    </div>
  </div>
  </article>

        </main>

        {relatedPosts.length > 0 && (
          <section style={styles.relatedSection}>
            <p style={styles.relatedEyebrow}>
              Continue Reading
            </p>

            <h2 style={styles.relatedHeading}>
              More from From One to the Next
            </h2>

            <div style={styles.relatedGrid}>
              {relatedPosts.map((post) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  incrementPostMetric={incrementPostMetric}
                  isAdmin={false}
                />
              ))}
            </div>
          </section>
        )}

        <Footer />

      </div>
    );
  }

  return (
  <div style={styles.page}>
    <SiteHeader
      currentView={currentView}      
      siteConfig={siteConfig}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      setCurrentView={setCurrentView}
      searchOpen={searchOpen}
      setSearchOpen={setSearchOpen}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isAdminPage={isAdminPage}
      session={session}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      startNewPost={startNewPost}
      signIn={signIn}
      signOut={signOut}
    />

    <main style={styles.layout}>

{currentView === "about" ? (
  <AboutPage content={siteConfig.about_page} />
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

          {displayedPosts.length > 0 && (
            <h2 style={styles.sectionHeading}>Latest Writings</h2>
          )}

          {displayedPosts.map((post) => (
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

          {activeCategory === "Home" && (
            <section style={styles.topicSection}>
              <p style={styles.topicEyebrow}>Explore by Topic</p>

              <h2 style={styles.topicHeading}>
                Find writing for where you are.
              </h2>

              <div style={styles.topicGrid}>
                {topicCards.map((topic) => (
                  <button
                    key={topic.label}
                    type="button"
                    className="topic-card"
                    style={{
                      ...styles.topicCard,
                      ...(topic.image
                        ? {
                            backgroundImage: `
                              linear-gradient(
                                180deg,
                                rgba(15, 23, 34, 0.12) 0%,
                                rgba(15, 23, 34, 0.88) 100%
                              ),
                              url("${topic.image}")
                            `,
                          }
                        : {}),
                    }}
                    
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "auto",
                      });

                      window.history.pushState(
                        {},
                        "",
                        `/?category=${encodeURIComponent(topic.label)}`
                      );

                      setCurrentView("home");
                      setActiveCategory(topic.label);
                    }} 
                    
                 >
                    <div
  		      className="topic-card-content"
  		      style={styles.topicCardContent}
		    >

                      <span
  			className="topic-card-label"
  			style={styles.topicCardLabel}
		      >

                        {topic.label}
                      </span>

                      <p
  			className="topic-card-description"
  			style={styles.topicCardDescription}
		      >

                        {topic.description}
                      </p>

                      <span style={styles.topicCardLink}>
                        Explore {topic.label} →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
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

<Footer />

    </div>
  );
}
