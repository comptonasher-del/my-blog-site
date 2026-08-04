import { useMemo } from "react";
import { SiteSettingsPanel } from "../components/AdminPanels";
import PostEditorModal from "../components/PostEditorModal";
import styles from "../styles/styles";

const adminStyles = {
  page: {
    minHeight: "100vh",
    background: "#f3f1ec",
    color: "#18212f",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  loadingPage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#f3f1ec",
    color: "#18212f",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  loginPage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    boxSizing: "border-box",
    background: "#18212f",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  loginCard: {
    width: "100%",
    maxWidth: "440px",
    padding: "42px",
    boxSizing: "border-box",
    background: "#fffaf3",
    borderRadius: "18px",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.28)",
  },

  loginLogo: {
    display: "grid",
    marginBottom: "38px",
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "19px",
    fontWeight: 700,
    lineHeight: 0.95,
  },

  eyebrow: {
    margin: "0 0 10px",
    color: "#817568",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },

  loginTitle: {
    margin: "0 0 10px",
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "36px",
    letterSpacing: "-0.04em",
  },

  loginText: {
    margin: "0 0 28px",
    color: "#6b6258",
    lineHeight: 1.6,
  },

  loginForm: {
    display: "grid",
    gap: "14px",
  },

  header: {
    padding: "22px 24px",
    background: "#18212f",
    color: "#fffaf3",
  },

  headerInner: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "18px",
  },

  brand: {
    display: "grid",
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontWeight: 700,
    lineHeight: 0.95,
  },

  adminLabel: {
    marginTop: "8px",
    color: "#cbbda8",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "9px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },

  viewSiteLink: {
    padding: "11px 15px",
    border: "1px solid rgba(255, 250, 243, 0.45)",
    color: "#fffaf3",
    fontSize: "12px",
    fontWeight: 700,
    textDecoration: "none",
  },

  newPostButton: {
    border: "1px solid #fffaf3",
    padding: "12px 16px",
    background: "#fffaf3",
    color: "#18212f",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },

  signOutButton: {
    border: 0,
    padding: "12px 14px",
    background: "transparent",
    color: "#fffaf3",
    fontFamily: "inherit",
    fontSize: "12px",
    cursor: "pointer",
  },

  main: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "46px 24px 80px",
    boxSizing: "border-box",
  },

  pageHeading: {
    marginBottom: "34px",
  },

  title: {
    margin: "0 0 10px",
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "clamp(38px, 5vw, 60px)",
    lineHeight: 1,
    letterSpacing: "-0.05em",
  },

  description: {
    margin: 0,
    color: "#6b6258",
    lineHeight: 1.6,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "16px",
    marginBottom: "30px",
  },

  statCard: {
    padding: "24px",
    background: "#fffaf3",
    border: "1px solid #e5dfd6",
  },

  statLabel: {
    margin: "0 0 12px",
    color: "#817568",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  statValue: {
    margin: 0,
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "34px",
  },

  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    alignItems: "start",
  },

  panel: {
    minWidth: 0,
    padding: "26px",
    background: "#fffaf3",
    border: "1px solid #e5dfd6",
  },

  panelWide: {
    gridColumn: "1 / -1",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "20px",
  },

  panelTitle: {
    margin: 0,
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "26px",
    letterSpacing: "-0.03em",
  },

  postsList: {
    display: "grid",
  },

  postRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "18px",
    padding: "18px 0",
    borderTop: "1px solid #e5dfd6",
  },

  postInfo: {
    minWidth: "220px",
    flex: "1 1 420px",
  },

  postTitle: {
    margin: "0 0 7px",
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "19px",
  },

  postMeta: {
    margin: 0,
    color: "#817568",
    fontSize: "12px",
  },

  postActions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },

  viewPostLink: {
    padding: "10px 12px",
    color: "#18212f",
    fontSize: "12px",
    fontWeight: 700,
    textDecoration: "none",
  },

  deleteButton: {
    border: "1px solid #b42318",
    padding: "10px 12px",
    background: "transparent",
    color: "#b42318",
    fontFamily: "inherit",
    fontSize: "12px",
    cursor: "pointer",
  },

  emptyState: {
    margin: 0,
    padding: "28px 0",
    color: "#6b6258",
  },
};

export default function AdminPage({
  authReady,
  session,
  email,
  setEmail,
  password,
  setPassword,
  signIn,
  signOut,
  posts,
  loadingPosts,
  startNewPost,
  startEdit,
  deletePost,
  settingsDraft,
  setSettingsDraft,
  savingSettings,
  saveSiteSettings,
  editing,
  draft,
  setDraft,
  savePost,
  closeEditor,
  handleImageUpload,
}) {
  const stats = useMemo(() => {
    return {
      posts: posts.length,
      views: posts.reduce(
        (total, post) => total + Number(post.views || 0),
        0
      ),
      readClicks: posts.reduce(
        (total, post) => total + Number(post.readClicks || 0),
        0
      ),
      shares: posts.reduce(
        (total, post) => total + Number(post.shares || 0),
        0
      ),
    };
  }, [posts]);

  function confirmDelete(post) {
    const confirmed = window.confirm(
      `Delete "${post.title}"?\n\nThis cannot be undone.`
    );

    if (confirmed) {
      deletePost(post.id);
    }
  }

  if (!authReady) {
    return (
      <div style={adminStyles.loadingPage}>
        Loading admin portal...
      </div>
    );
  }

  if (!session) {
    return (
      <div style={adminStyles.loginPage}>
        <div style={adminStyles.loginCard}>
          <div style={adminStyles.loginLogo}>
            <span>FROM ONE TO</span>
            <span>THE NEXT</span>
          </div>

          <p style={adminStyles.eyebrow}>Administration</p>

          <h1 style={adminStyles.loginTitle}>
            Welcome back.
          </h1>

          <p style={adminStyles.loginText}>
            Sign in to manage articles, site settings, and
            publication activity.
          </p>

          <form
            style={adminStyles.loginForm}
            onSubmit={(event) => {
              event.preventDefault();
              signIn();
            }}
          >
            <input
              style={styles.input}
              type="email"
              autoComplete="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" style={styles.primaryButton}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={adminStyles.page}>
      <header style={adminStyles.header}>
        <div style={adminStyles.headerInner}>
          <div style={adminStyles.brand}>
            <span>FROM ONE TO</span>
            <span>THE NEXT</span>
            <span style={adminStyles.adminLabel}>
              Admin portal
            </span>
          </div>

          <div style={adminStyles.headerActions}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={adminStyles.viewSiteLink}
            >
              View website
            </a>

            <button
              type="button"
              style={adminStyles.newPostButton}
              onClick={startNewPost}
            >
              + New article
            </button>

            <button
              type="button"
              style={adminStyles.signOutButton}
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main style={adminStyles.main}>
        <div style={adminStyles.pageHeading}>
          <p style={adminStyles.eyebrow}>Overview</p>

          <h1 style={adminStyles.title}>
            Publication dashboard
          </h1>

          <p style={adminStyles.description}>
            Signed in as {session.user?.email}
          </p>
        </div>

        <section style={adminStyles.statsGrid}>
          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>Articles</p>
            <p style={adminStyles.statValue}>{stats.posts}</p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>Views</p>
            <p style={adminStyles.statValue}>{stats.views}</p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>Read clicks</p>
            <p style={adminStyles.statValue}>
              {stats.readClicks}
            </p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>Shares</p>
            <p style={adminStyles.statValue}>{stats.shares}</p>
          </div>
        </section>

        <div style={adminStyles.dashboardGrid}>
          <section
            style={{
              ...adminStyles.panel,
              ...adminStyles.panelWide,
            }}
          >
            <div style={adminStyles.panelHeader}>
              <h2 style={adminStyles.panelTitle}>
                Manage articles
              </h2>

              <button
                type="button"
                style={styles.primaryButton}
                onClick={startNewPost}
              >
                + New article
              </button>
            </div>

            {loadingPosts ? (
              <p style={adminStyles.emptyState}>
                Loading articles...
              </p>
            ) : posts.length === 0 ? (
              <p style={adminStyles.emptyState}>
                No articles have been published yet.
              </p>
            ) : (
              <div style={adminStyles.postsList}>
                {posts.map((post) => (
                  <div key={post.id} style={adminStyles.postRow}>
                    <div style={adminStyles.postInfo}>
                      <h3 style={adminStyles.postTitle}>
                        {post.title}
                      </h3>

                      <p style={adminStyles.postMeta}>
                        {post.type || "Uncategorized"} ·{" "}
                        {post.date || "No date"}
                        {post.featured ? " · Featured" : ""}
                      </p>
                    </div>

                    <div style={adminStyles.postActions}>
                      <a
                        href={`/post/${post.slug || post.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={adminStyles.viewPostLink}
                      >
                        View
                      </a>

                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => startEdit(post)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        style={adminStyles.deleteButton}
                        onClick={() => confirmDelete(post)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {settingsDraft && (
            <SiteSettingsPanel
              settingsDraft={settingsDraft}
              setSettingsDraft={setSettingsDraft}
              savingSettings={savingSettings}
              saveSiteSettings={saveSiteSettings}
            />
          )}
        </div>
      </main>

      {editing && (
        <PostEditorModal
          draft={draft}
          setDraft={setDraft}
          posts={posts}
          savePost={savePost}
          closeEditor={closeEditor}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}