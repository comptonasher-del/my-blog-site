import { useEffect, useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isOverlayHeader = currentView === "home" && !isAdminPage;
  const headerColor = isOverlayHeader ? "#fffaf3" : "#18212f";

function openCategory(category) {
  setMobileMenuOpen(false);

  if (currentView === "article") {
    window.location.href = `/?category=${encodeURIComponent(category)}`;
    return;
  }

  setCurrentView("home");
  setActiveCategory(category);
}

function openAboutPage() {
  setMobileMenuOpen(false);

  if (currentView === "article") {
    window.location.href = "/?view=about";
    return;
  }

  setCurrentView("about");
  setActiveCategory("About");
}
  function closeSearch() {
    setSearchQuery("");
    setSearchOpen(false);
  }


  function openSubscribe() {
  setMobileMenuOpen(false);

  window.requestAnimationFrame(() => {
    document.getElementById("subscribe")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
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

        <nav className="desktop-nav" style={styles.nav}>
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

        <button
          style={{
            ...styles.headerSubscribeButton,
            color: headerColor,
            borderColor: headerColor,
          }}
          onClick={openSubscribe}
        >
          Subscribe
          </button>
	  </nav>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          style={{
            ...styles.mobileMenuButton,
            color: mobileMenuOpen ? "#18212f" : headerColor,
          }}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>      
      <nav
        className={`mobile-menu-panel ${
          mobileMenuOpen ? "mobile-menu-panel-open" : ""
        }`}
        aria-hidden={!mobileMenuOpen}
        style={styles.mobileMenuPanel}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            style={{
              ...styles.mobileMenuLink,
              color: "#18212f",
            }}
            onClick={() => openCategory(item)}
          >
            {item}
          </button>
        ))}

        <button
          style={{
            ...styles.mobileMenuLink,
            color: "#18212f",
          }}
          onClick={openAboutPage}
        >
          About
        </button>

        <button
          style={{
            ...styles.mobileMenuLink,
            color: "#18212f",
          }}
          onClick={() => {
            setSearchOpen(!searchOpen);
            setMobileMenuOpen(false);
          }}
        >
          Search
        </button>

        <button
          style={{
            ...styles.mobileMenuLink,
            color: "#18212f",
          }}
          onClick={openSubscribe}
        >
          Subscribe
        </button>

        </nav>


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