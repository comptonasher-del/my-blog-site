import { useState } from "react";
import styles from "../styles/styles";
import { getReadingTime } from "../utils/readingTime";

import {
  createArticleSessionId,
  storeArticleSessionId,
  trackArticleEvent,
} from "../utils/analytics";

export function FeaturedArticle({
  post,
  isAdmin,
  onEdit,
  onDelete,
  incrementPostMetric,
}) { 

  const isLongTitle = post.title.length > 55;
  const readTime = getReadingTime(post.body);
   
  async function openPost() {
    const sessionId = createArticleSessionId();

    storeArticleSessionId(post.id, sessionId);

    await Promise.all([
      incrementPostMetric(post.id, "read_clicks"),
      trackArticleEvent({
        postId: post.id,
        sessionId,
        eventType: "on_site_open",
      }),
    ]);

    window.location.href =
      `/post/${post.slug || post.id}`;
  }
  return (
    <article
      style={{
        ...styles.featuredCard,
        ...(post.image
          ? {
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(15, 23, 34, 0.92) 0%,
                  rgba(15, 23, 34, 0.68) 48%,
                  rgba(15, 23, 34, 0.18) 100%
                ),
                url("${post.image}")
              `,
            }
          : {}),
      }}
      onClick={openPost}
    >
      <div
  	style={{
    	  ...styles.featuredContent,
    	  ...(isLongTitle ? styles.featuredContentLong : {}),
  	}}
      >
        <div style={styles.featuredMeta}>
 	  {post.type} · {post.date} · {readTime} min read
	</div>

  	<h2
    	  style={{
      	    ...styles.featuredTitle,
      	    ...(isLongTitle ? styles.featuredTitleLong : {}),
    	  }}
  	>
    	  {post.title}
  	</h2>

        <p style={styles.featuredDeck}>
          {post.excerpt || `${(post.body || "").slice(0, 220)}...`}
        </p>

        <span style={styles.featuredReadLink}>
          Read article →
        </span>

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
  const readTime = getReadingTime(post.body);

  async function openPost() {
    const sessionId = createArticleSessionId();

    storeArticleSessionId(post.id, sessionId);
  
    await Promise.all([
      incrementPostMetric(post.id, "read_clicks"),
      trackArticleEvent({
        postId: post.id,
        sessionId,
        eventType: "on_site_open",
      }),
    ]);

    window.location.href =
      `/post/${post.slug || post.id}`;
  }

  return (
    <article
      className={`article-card ${
        post.image ? "article-card-has-image" : "article-card-no-image"
      }`}
      style={hovered ? styles.cardHover : styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={openPost}
    >
      {post.image && (
        <img
          className="article-card-image"
          src={post.image}
          alt={post.title}
          style={styles.postImage}
        />
      )}

      <div className="article-card-body" style={styles.cardBody}>
        <div className="article-card-meta" style={styles.meta}>
          {post.type} · {post.date} · {readTime} min read
        </div>

        <h2 className="article-card-title" style={styles.postTitle}>
          {post.title}
        </h2>

        <p className="article-card-excerpt" style={styles.bodyText}>
          {post.excerpt || `${(post.body || "").slice(0, 150)}...`}
        </p>

        <a
          href={`/post/${post.slug || post.id}`}
          style={styles.readLink}
          onClick={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await openPost();
          }} 
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