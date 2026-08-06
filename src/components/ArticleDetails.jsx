import { useEffect, useRef, useState } from "react";
import styles from "../styles/styles";

import {
  createArticleSessionId,
  trackArticleEvent,
} from "../utils/analytics";

export function ShareButton({
  post,
  incrementPostMetric,
  articleSessionId,
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef(null);

  const postUrl = `${window.location.origin}/post/${
    post.slug || post.id
  }`;

  const shareText =
    post.excerpt?.trim() ||
    `Read “${post.title}” on From One to the Next.`;

  const supportsNativeShare =
    typeof navigator.share === "function";

  const isIOS =
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);

  const canText =
    /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    ) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);

  const textMessage = `I thought you might appreciate this article:\n\n${post.title}\n${postUrl}`;

  const smsUrl = `sms:${
    isIOS ? "&" : "?"
  }body=${encodeURIComponent(textMessage)}`;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  async function trackShare() {
    const sessionId =
      articleSessionId || createArticleSessionId();

    const trackingTasks = [
      trackArticleEvent({
        postId: post.id,
        sessionId,
        eventType: "share",
      }),
    ];

    if (incrementPostMetric) {
      trackingTasks.push(
        incrementPostMetric(post.id, "shares")
      );
    }

    await Promise.all(trackingTasks);
  }  

  async function shareWithDevice() {
    try {
      await navigator.share({
        title: post.title,
        text: shareText,
        url: postUrl,
      });

      await trackShare();
      setOpen(false);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Native sharing failed:", error);
      }
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(postUrl);
      await trackShare();

      setCopied(true);
      setOpen(false);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Could not copy article link:", error);
    }
  }

  function handleDirectShare() {
    setOpen(false);
    void trackShare();
  }

  return (
    <div ref={wrapperRef} style={styles.shareWrapper}>
      <button
        type="button"
        className="share-main-button"
        aria-haspopup="menu"
        aria-expanded={open}
        style={styles.shareButton}
        onClick={() => setOpen((current) => !current)}
      >
        <span
          aria-hidden="true"
          style={styles.shareButtonIcon}
        >
          ↗
        </span>

        <span>{copied ? "Link copied" : "Share"}</span>

        <span
          aria-hidden="true"
          style={styles.shareButtonChevron}
        >
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div
          className="share-menu-popover"
          style={styles.shareMenu}
          role="menu"
        >
          <p style={styles.shareMenuEyebrow}>
            Share this article
          </p>

          <p style={styles.shareMenuTitle}>
            {post.title}
          </p>

          <div style={styles.shareMenuDivider} />

          {supportsNativeShare && (
            <button
              type="button"
              className="share-menu-item"
              style={styles.shareMenuItem}
              onClick={shareWithDevice}
            >
              <span style={styles.shareMenuIcon}>↗</span>

              <span style={styles.shareMenuItemText}>
                <span style={styles.shareMenuItemLabel}>
                  Share with device
                </span>

                <span style={styles.shareMenuItemNote}>
                  Messages, AirDrop, and installed apps
                </span>
              </span>
            </button>
          )}

          <button
            type="button"
            className="share-menu-item"
            style={styles.shareMenuItem}
            onClick={copyLink}
          >
            <span style={styles.shareMenuIcon}>⧉</span>

            <span style={styles.shareMenuItemText}>
              <span style={styles.shareMenuItemLabel}>
                Copy link
              </span>

              <span style={styles.shareMenuItemNote}>
                Copy the article URL
              </span>
            </span>
          </button>

          {canText && (
            <a
              className="share-menu-item"
              style={styles.shareMenuItem}
              href={smsUrl}
              onClick={handleDirectShare}
            >
              <span style={styles.shareMenuIcon}>•••</span>

              <span style={styles.shareMenuItemText}>
                <span style={styles.shareMenuItemLabel}>
                  Text message
                </span>

                <span style={styles.shareMenuItemNote}>
                  Open a new message
                </span>
              </span>
            </a>
          )}

          <a
            className="share-menu-item"
            style={styles.shareMenuItem}
            href={`mailto:?subject=${encodeURIComponent(
              post.title
            )}&body=${encodeURIComponent(
              `${shareText}\n\n${postUrl}`
            )}`}
            onClick={handleDirectShare}
          >
            <span style={styles.shareMenuIcon}>@</span>

            <span style={styles.shareMenuItemText}>
              <span style={styles.shareMenuItemLabel}>
                Email
              </span>

              <span style={styles.shareMenuItemNote}>
                Send through your email app
              </span>
            </span>
          </a>

          <a
            className="share-menu-item"
            style={styles.shareMenuItem}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              postUrl
            )}`}
            target="_blank"
            rel="noreferrer"
            onClick={handleDirectShare}
          >
            <span style={styles.shareMenuIcon}>f</span>

            <span style={styles.shareMenuItemText}>
              <span style={styles.shareMenuItemLabel}>
                Facebook
              </span>

              <span style={styles.shareMenuItemNote}>
                Open Facebook sharing
              </span>
            </span>
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

