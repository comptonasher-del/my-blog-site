import { useState } from "react";
import styles from "../styles/styles";

export function FeaturedArticle({
  post,
  isAdmin,
  onEdit,
  onDelete,
}) {
  return (
    <article
      style={styles.featuredCard}
      onClick={() => {
        window.location.href = `/post/${post.slug || post.id}`;
      }}
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={styles.featuredImage}
        />
      )}

      <div style={styles.cardBody}>
        <div style={styles.featuredMeta}>{post.type}</div>

        <h2 style={styles.featuredTitle}>{post.title}</h2>

        <p style={styles.featuredDeck}>
          {post.excerpt || `${(post.body || "").slice(0, 220)}...`}
        </p>

        {isAdmin && (
          <AdminPostButtons
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </article>
  );
}

export function ArticleCard({
  post,
  isAdmin,
  onEdit,
  onDelete,
  incrementPostMetric,
}) {
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
        <img
          src={post.image}
          alt={post.title}
          style={styles.postImage}
        />
      )}

      <div style={styles.cardBody}>
        <div style={styles.meta}>
          {post.type} · {post.date}
        </div>

        <h2 style={styles.postTitle}>{post.title}</h2>

        <p style={styles.bodyText}>
          {post.excerpt || `${(post.body || "").slice(0, 150)}...`}
        </p>

        <a
          href={`/post/${post.slug || post.id}`}
          style={styles.readLink}
          onClick={() =>
            incrementPostMetric(post.id, "read_clicks")
          }
        >
          Read article →
        </a>

        {isAdmin && (
          <AdminPostButtons
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </article>
  );
}

function AdminPostButtons({
  post,
  onEdit,
  onDelete,
}) {
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