import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/styles";
import { getReadingTime } from "../utils/readingTime";

export default function SearchOverlay({
  posts = [],
  searchQuery,
  setSearchQuery,
  onClose,
}) {
  const normalizedQuery = searchQuery
    .trim()
    .toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return posts
      .filter((post) => {
        const searchableText = [
          post.title,
          post.excerpt,
          post.body,
          post.author,
          post.type,
        ]
          .filter(Boolean)
          .join(" ")
          .replace(/<[^>]*>/g, " ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      )
      .slice(0, 8);
  }, [posts, normalizedQuery]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return createPortal(
    <div
      style={styles.searchOverlayBackdrop}
      onMouseDown={onClose}
    >
      <section
        className="search-overlay-panel"
        style={styles.searchOverlayPanel}
        role="dialog"
        aria-modal="true"
        aria-label="Search articles"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div style={styles.searchOverlayHeader}>
          <div>
            <p style={styles.searchOverlayEyebrow}>
              Search From One to the Next
            </p>

            <h2 style={styles.searchOverlayTitle}>
              What are you looking for?
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close search"
            style={styles.searchOverlayClose}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <input
          autoFocus
          type="search"
          placeholder="Search articles, authors, or topics..."
          value={searchQuery}
          style={styles.searchOverlayInput}
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
        />

        <div style={styles.searchOverlayResults}>
          {!normalizedQuery && (
            <p style={styles.searchOverlayMessage}>
              Begin typing to search the article
              archive.
            </p>
          )}

          {normalizedQuery &&
            results.length === 0 && (
              <p style={styles.searchOverlayMessage}>
                No articles found for “
                {searchQuery.trim()}.”
              </p>
            )}

          {results.map((post) => (
            <a
              key={post.id}
              className="search-result-row"
              href={`/post/${post.slug || post.id}`}
              style={styles.searchResult}
              onClick={onClose}
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt=""
                  style={styles.searchResultImage}
                />
              ) : (
                <div
                  style={
                    styles.searchResultImagePlaceholder
                  }
                />
              )}

              <div style={styles.searchResultContent}>
                <p style={styles.searchResultMeta}>
                  {post.type} · {post.date} ·{" "}
                  {getReadingTime(post.body)} min read
                </p>

                <h3 style={styles.searchResultTitle}>
                  {post.title}
                </h3>

                <p
                  className="search-result-excerpt"
                  style={styles.searchResultExcerpt}
                >
                  {post.excerpt ||
                    "Read this article from From One to the Next."}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>,
    document.body
  );
}