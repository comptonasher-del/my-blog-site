import { useState } from "react";
import styles from "../styles/styles";

export function ShareButton({ post, incrementPostMetric }) {
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

export function AuthorBlock({ post }) {
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

