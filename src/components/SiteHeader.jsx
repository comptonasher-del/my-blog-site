import styles from "../styles/styles";

const NAV_ITEMS = ["Home", "Journal", "Essays", "Reviews"];

export default function SiteHeader({
  currentView,
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
  const isOverlayHeader = currentView === "home" && !isAdminPage;
  const headerColor = isOverlayHeader ? "#fffaf3" : "#18212f";

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
    <header
      style={{
        ...styles.hero,
        ...(isOverlayHeader
          ? styles.heroOverlay
          : styles.heroStandard),
      }}
    >
      <div style={styles.headerInner}>
        <button
          type="button"
          aria-label={siteConfig.site_title}
          style={{
            ...styles.compactLogo,
            color: headerColor,
          }}
          onClick={() => openCategory("Home")}
        >
          <span>FROM ONE TO</span>
          <span>THE NEXT</span>
        </button>

        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              style={{
                ...styles.navLink,
                color: headerColor,
                borderBottomColor:
                  activeCategory === item
                    ? headerColor
                    : "transparent",
              }}
              onClick={() => openCategory(item)}
            >
              {item}
            </button>
          ))}

          <button
            style={{
              ...styles.navLink,
              color: headerColor,
              borderBottomColor:
                activeCategory === "About"
                  ? headerColor
                  : "transparent",
            }}
            onClick={openAboutPage}
          >
            About
          </button>

          <button
            aria-label="Search articles"
            style={{
              ...styles.searchButton,
              color: headerColor,
            }}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            ⌕
          </button>
        </nav>
      </div>

      {searchOpen && (
        <div style={styles.searchWrapper}>
          <input
            autoFocus
            style={styles.searchInput}
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          <button
            style={{
              ...styles.closeSearch,
              color: headerColor,
            }}
            onClick={closeSearch}
          >
            ✕
          </button>
        </div>
      )}

      {isAdminPage && (
        <div style={styles.adminHeaderControls}>
          {session ? (
            <>
              <button
                style={styles.primaryButton}
                onClick={startNewPost}
              >
                + New post
              </button>

              <button
                style={styles.secondaryButton}
                onClick={signOut}
              >
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
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                style={styles.primaryButton}
                onClick={signIn}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}