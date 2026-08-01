import styles from "../styles/styles";

export function AdminPostMetrics({ post }) {
  return (
    <div style={styles.adminMetrics}>
      <span>{post.views || 0} views</span>
      <span>{post.readClicks || 0} read clicks</span>
      <span>{post.shares || 0} shares</span>
    </div>
  );
}

export function AdminStats({ posts }) {
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