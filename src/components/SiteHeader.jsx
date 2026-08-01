import styles from "../styles/styles";

const NAV_ITEMS = ["Home", "Journal", "Essays", "Reviews"];

export default function SiteHeader({
  siteConfig,
  activeCategory,
  setActiveCategory,
  setCurrentView,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  isAdminPage,
  session,
  email,
  setEmail,
  password,
  setPassword,
  startNewPost,
  signIn,
  signOut,
}) {
  function openCategory(category) {
    setCurrentView("home");
    setActiveCategory(category);
  }

  function openAboutPage() {
    setCurrentView("about");
    setActiveCategory("About");
  }

  function closeSearch() {
    setSearchQuery("");
    setSearchOpen(false);
  }

  return (
    <header style={styles.hero}>
      <div>
        <div style={styles.masthead}>
          <h1 style={styles.title}>{siteConfig.site_title}</h1>

          <p style={styles.subtitle}>{siteConfig.site_tagline}</p>

          <nav style={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                style={{
                  ...styles.navLink,
                  ...(activeCategory === item
                    ? styles.navLinkActive
                    : {}),
                }}
                onClick={() => openCategory(item)}
              >
                {item}
              </button>
            ))}

            <button
              style={{
                ...styles.navLink,
                ...(activeCategory === "About"
                  ? styles.navLinkActive
                  : {}),
              }}
              onClick={openAboutPage}
            >
              About
            </button>

            <button
              style={styles.searchButton}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              ⌕
            </button>
          </nav>

          {searchOpen && (
            <div style={styles.searchWrapper}>
              <input
                autoFocus
                style={styles.searchInput}
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />

              <button style={styles.closeSearch} onClick={closeSearch}>
                ✕
              </button>
            </div>
          )}
        </div>

        {siteConfig.homepage_intro && (
          <p style={styles.homepageIntro}>
            {siteConfig.homepage_intro}
          </p>
        )}
      </div>

      {isAdminPage && (
        <div style={styles.adminHeaderControls}>
          {session ? (
            <>
              <button style={styles.primaryButton} onClick={startNewPost}>
                + New post
              </button>

              <button style={styles.secondaryButton} onClick={signOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button style={styles.primaryButton} onClick={signIn}>
                Sign in
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}