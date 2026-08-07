import {
  useEffect,
  useMemo,
  useState,
} from "react";
import PostEditorModal from "../components/PostEditorModal";
import styles from "../styles/styles";
import { supabase } from "../lib/supabase";

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

  statHelp: {
    margin: "10px 0 0",
    color: "#817568",
    fontSize: "11px",
    lineHeight: 1.45,
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

  postMetrics: {
    flex: "1 1 560px",
    width: "100%",
    minWidth: 0,
    maxWidth: "620px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(110px, 100%), 1fr))",
    gap: "8px",
    boxSizing: "border-box",
  },

  postMetric: {
    padding: "12px",
    border: "1px solid #e5dfd6",
    background: "#f8f5f0",
  },

  postMetricLabel: {
    margin: "0 0 6px",
    color: "#817568",
    fontSize: "8px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },

  postMetricValue: {
    margin: 0,
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "22px",
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
  editing,
  draft,
  setDraft,
  savePost,
  closeEditor,
  handleImageUpload,
}) {

  const [articleEvents, setArticleEvents] =
    useState([]);

  const [loadingAnalytics, setLoadingAnalytics] =
    useState(true);
  const [analyticsRange, setAnalyticsRange] =
    useState("30");
  const [articleSort, setArticleSort] =
    useState("newest");

  useEffect(() => {
    if (!session) {
      setArticleEvents([]);
      setLoadingAnalytics(false);
      return;
    }

    let isActive = true;

    async function loadArticleEvents() {
      setLoadingAnalytics(true);

      const { data, error } = await supabase
        .from("article_events")
        .select(
          "post_id, visitor_id, session_id, event_type, created_at"
        )
        .order("created_at", { ascending: false });

      if (!isActive) return;

      if (error) {
        console.error(
          "Error loading article analytics:",
          error
        );

        setArticleEvents([]);
      } else {
        setArticleEvents(data || []);
      }

      setLoadingAnalytics(false);
    }

    loadArticleEvents();

    return () => {
      isActive = false;
    };
  }, [session]);

  const filteredArticleEvents = useMemo(() => {
    if (analyticsRange === "all") {
      return articleEvents;
    }

    const numberOfDays = Number(analyticsRange);

    const cutoffTime =
      Date.now() -
      numberOfDays * 24 * 60 * 60 * 1000;

    return articleEvents.filter((event) => {
      return (
        new Date(event.created_at).getTime() >=
        cutoffTime
      );
    });
  }, [articleEvents, analyticsRange]);

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

  const analyticsStats = useMemo(() => {
    const viewEvents = filteredArticleEvents.filter(
      (event) => event.event_type === "view"
    );

    const viewSessions = new Set(
      viewEvents
        .map((event) => event.session_id)
        .filter(Boolean)
    );

    const uniqueReaders = new Set(
      viewEvents
        .map((event) => event.visitor_id)
        .filter(Boolean)
    );

    const halfwaySessions = new Set(
      filteredArticleEvents
        .filter(
          (event) => event.event_type === "read_50"
        )
        .map((event) => event.session_id)
        .filter((sessionId) =>
          viewSessions.has(sessionId)
        )
    );

    const completedSessions = new Set(
      filteredArticleEvents
        .filter(
          (event) => event.event_type === "read_90"
        )
        .map((event) => event.session_id)
        .filter((sessionId) =>
          viewSessions.has(sessionId)
        )
    );

    const percentage = (amount, total) => {
      if (total === 0) return 0;

      return Math.round((amount / total) * 100);
    };

    return {
      uniqueReaders: uniqueReaders.size,
      visits: viewSessions.size,
      halfwayRate: percentage(
        halfwaySessions.size,
        viewSessions.size
      ),
      completionRate: percentage(
        completedSessions.size,
        viewSessions.size
      ),
      shares: filteredArticleEvents.filter(
        (event) => event.event_type === "share"
      ).length,
    };
  }, [articleEvents]);

    function getPostAnalytics(postId) {
    const postEvents = filteredArticleEvents.filter(
      (event) =>
        String(event.post_id) === String(postId)
    );

    const viewSessions = new Set(
      postEvents
        .filter(
          (event) => event.event_type === "view"
        )
        .map((event) => event.session_id)
        .filter(Boolean)
    );

    const uniqueReaders = new Set(
      postEvents
        .filter(
          (event) => event.event_type === "view"
        )
        .map((event) => event.visitor_id)
        .filter(Boolean)
    );

    const halfwaySessions = new Set(
      postEvents
        .filter(
          (event) =>
            event.event_type === "read_50"
        )
        .map((event) => event.session_id)
        .filter((sessionId) =>
          viewSessions.has(sessionId)
        )
    );

    const completedSessions = new Set(
      postEvents
        .filter(
          (event) =>
            event.event_type === "read_90"
        )
        .map((event) => event.session_id)
        .filter((sessionId) =>
          viewSessions.has(sessionId)
        )
    );

    const percentage = (amount) => {
      if (viewSessions.size === 0) return 0;

      return Math.round(
        (amount / viewSessions.size) * 100
      );
    };

    return {
      uniqueReaders: uniqueReaders.size,
      visits: viewSessions.size,
      halfwayRate: percentage(
        halfwaySessions.size
      ),
      completionRate: percentage(
        completedSessions.size
      ),
      shares: postEvents.filter(
        (event) => event.event_type === "share"
      ).length,
    };
  }

  const sortedPosts = useMemo(() => {
    const newestFirst = (firstPost, secondPost) => {
      const firstDate = new Date(
        firstPost.date || 0
      ).getTime();

      const secondDate = new Date(
        secondPost.date || 0
      ).getTime();

      return secondDate - firstDate;
    };

    return [...posts].sort((firstPost, secondPost) => {
      const firstAnalytics =
        getPostAnalytics(firstPost.id);

      const secondAnalytics =
        getPostAnalytics(secondPost.id);

      let difference = 0;

      if (articleSort === "visits") {
        difference =
          secondAnalytics.visits -
          firstAnalytics.visits;
      }

      if (articleSort === "readers") {
        difference =
          secondAnalytics.uniqueReaders -
          firstAnalytics.uniqueReaders;
      }

      if (articleSort === "completion") {
        difference =
          secondAnalytics.completionRate -
          firstAnalytics.completionRate;
      }

      if (articleSort === "shares") {
        difference =
          secondAnalytics.shares -
          firstAnalytics.shares;
      }

      if (articleSort === "newest" || difference === 0) {
        return newestFirst(firstPost, secondPost);
      }

      return difference;
    });
  }, [
    posts,
    filteredArticleEvents,
    articleSort,
  ]);

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
            Sign in to manage articles and
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

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#6b6258",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          Analytics period

          <select
            value={analyticsRange}
            onChange={(event) =>
              setAnalyticsRange(event.target.value)
          }
          style={{
            border: "1px solid #d8d0c5",
            padding: "10px 32px 10px 12px",
            background: "#fffaf3",
            color: "#18212f",
            font: "inherit",
            cursor: "pointer",
          }}
        >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </label>
      </div>

        <section style={adminStyles.statsGrid}>
          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>Articles</p>
            <p style={adminStyles.statValue}>
              {stats.posts}
            </p>
            <p style={adminStyles.statHelp}>
              Published articles
            </p>
          </div>
        
          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>
              Unique readers
            </p>
            <p style={adminStyles.statValue}>
              {loadingAnalytics
                ? "—"
                : analyticsStats.uniqueReaders}
            </p>
            <p style={adminStyles.statHelp}>
              Approximate individual readers
            </p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>
              Article visits
            </p>
            <p style={adminStyles.statValue}>
              {loadingAnalytics
                ? "—"
                : analyticsStats.visits}
            </p>
            <p style={adminStyles.statHelp}>
              Individual reading sessions
            </p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>
              Reached halfway
            </p>
            <p style={adminStyles.statValue}>
              {loadingAnalytics
                ? "—"
                : `${analyticsStats.halfwayRate}%`}
            </p>
            <p style={adminStyles.statHelp}>
              Visits that reached 50%
            </p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>
              Completed
            </p>
            <p style={adminStyles.statValue}>
              {loadingAnalytics
                ? "—"
                : `${analyticsStats.completionRate}%`}
            </p>
            <p style={adminStyles.statHelp}>
              Visits that reached 90%
            </p>
          </div>

          <div style={adminStyles.statCard}>
            <p style={adminStyles.statLabel}>Shares</p>
            <p style={adminStyles.statValue}>
              {loadingAnalytics
                ? "—"
                : analyticsStats.shares}
            </p>
            <p style={adminStyles.statHelp}>
              Recorded share actions
            </p>
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
    
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                   }}
                >
                   <label
                     style={{
                       display: "flex",
                       alignItems: "center",
                       gap: "8px",
                       color: "#6b6258",
                       fontSize: "12px",
                       fontWeight: 600,
                     }}
                   >
                     Sort by

                     <select
                       value={articleSort}
                       onChange={(event) =>
                         setArticleSort(event.target.value)
                       }
                       style={{
                         border: "1px solid #d8d0c5",
                         padding: "10px 32px 10px 12px",
                         background: "#fffaf3",
                         color: "#18212f",
                         font: "inherit",
                         cursor: "pointer",
                       }}
                     >
                       <option value="newest">Newest</option>
                       <option value="visits">Most visits</option>
                       <option value="readers">
                         Most unique readers
                       </option>
                       <option value="completion">
                         Highest completion
                       </option>
                       <option value="shares">Most shares</option>
                     </select>
                   </label>

                   <button
                     type="button"
                     style={styles.primaryButton}
                     onClick={startNewPost}
                   >
                     + New article
                   </button>
            </div>
               
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
                {sortedPosts.map((post) => (
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

		    <div style={adminStyles.postMetrics}>
                      <div style={adminStyles.postMetric}>
                        <p style={adminStyles.postMetricLabel}>
                          Unique readers
                        </p>

                        <p style={adminStyles.postMetricValue}>
                          {loadingAnalytics
                            ? "—"
                            : getPostAnalytics(post.id).uniqueReaders}
                        </p>
                      </div>

                      <div style={adminStyles.postMetric}>
                        <p style={adminStyles.postMetricLabel}>
                          Visits
                        </p>

                        <p style={adminStyles.postMetricValue}>
                          {loadingAnalytics
                            ? "—"
                            : getPostAnalytics(post.id).visits}
                        </p>
                      </div>

                      <div style={adminStyles.postMetric}>
                        <p style={adminStyles.postMetricLabel}>
                          Halfway
                        </p>

                        <p style={adminStyles.postMetricValue}>
                          {loadingAnalytics
                            ? "—"
                            : `${getPostAnalytics(post.id).halfwayRate}%`}
                        </p>
                      </div>

                      <div style={adminStyles.postMetric}>
                        <p style={adminStyles.postMetricLabel}>
                          Completed
                        </p>

                        <p style={adminStyles.postMetricValue}>
                          {loadingAnalytics
                            ? "—"
                            : `${getPostAnalytics(post.id).completionRate}%`}
                        </p>
                      </div>

                      <div style={adminStyles.postMetric}>
                        <p style={adminStyles.postMetricLabel}>
                          Shares
                        </p>

                        <p style={adminStyles.postMetricValue}>
                          {loadingAnalytics
                            ? "—"
                            : getPostAnalytics(post.id).shares}
                        </p>
                      </div>
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