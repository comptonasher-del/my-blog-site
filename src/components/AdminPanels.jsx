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
export function SiteSettingsPanel({
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
        onChange={(event) =>
          updateSetting("homepage_intro", event.target.value)
        }
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
        onChange={(event) =>
          updateSetting("background_color", event.target.value)
        }
        placeholder="Background color"
      />

      <input
        style={styles.input}
        value={settingsDraft.card_background || ""}
        onChange={(event) =>
          updateSetting("card_background", event.target.value)
        }
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
        onChange={(event) =>
          updateSetting("muted_text_color", event.target.value)
        }
        placeholder="Muted text color"
      />

      <input
        style={styles.input}
        type="number"
        value={settingsDraft.card_radius || 28}
        onChange={(event) =>
          updateSetting("card_radius", Number(event.target.value))
        }
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