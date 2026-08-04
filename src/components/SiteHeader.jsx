import { useEffect, useRef, useState } from "react";
import styles from "../styles/styles";
import SearchOverlay from "./SearchOverlay";

const NAV_ITEMS = ["Home", "Journal", "Essays", "Reviews"];

export default function SiteHeader({
  currentView,
  siteConfig,
  posts,
  activeCategory,
  setActiveCategory,
  setCurrentView,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
}) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const upwardScrollDistance = useRef(0);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const hideHeaderPoint = 72;
    const solidHeaderStart = 160;
    const solidHeaderReset = 24;
    const upwardDistanceNeeded = 12;

    function handleScroll() {
      const currentScrollY = Math.max(window.scrollY, 0);

      const scrollDifference =
        currentScrollY - lastScrollY.current;

      const hasScrolledPastHidePoint =
        currentScrollY > hideHeaderPoint;

      // Use separate thresholds to prevent flickering
      // between the transparent and cream header.
      if (currentScrollY >= solidHeaderStart) {
        setHeaderScrolled(true);
      } else if (currentScrollY <= solidHeaderReset) {
        setHeaderScrolled(false);
      }

      if (
        mobileMenuOpen ||
        searchOpen ||
        !hasScrolledPastHidePoint
      ) {
        setHeaderVisible(true);
        upwardScrollDistance.current = 0;
      } else if (scrollDifference > 2) {
        setHeaderVisible(false);
        upwardScrollDistance.current = 0;
      } else if (scrollDifference < 0) {
        upwardScrollDistance.current += Math.abs(
          scrollDifference
        );

        if (
          upwardScrollDistance.current >=
          upwardDistanceNeeded
        ) {
          setHeaderVisible(true);
          upwardScrollDistance.current = 0;
        }
      }

      lastScrollY.current = currentScrollY;
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen, searchOpen]);  

  const isOverlayHeader = currentView === "home";
  
  const useSolidHeader =
    headerScrolled ||
    mobileMenuOpen ||
    searchOpen ||
    !isOverlayHeader;

  const headerColor = useSolidHeader
    ? "#18212f"
    : "#fffaf3";  

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
      className={`smart-site-header ${
        headerScrolled
          ? "smart-site-header-scrolled"
          : ""
      } ${
        headerVisible
          ? "smart-site-header-visible"
          : "smart-site-header-hidden"
      } ${
        mobileMenuOpen
          ? "smart-site-header-menu-open"
          : ""
      }`}
      style={{
        ...styles.hero,
        ...(useSolidHeader
          ? styles.heroStandard
          : styles.heroOverlay),
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
                  currentView === "home" &&
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
               currentView === "about"
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
            onClick={() => setSearchOpen(true)}
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
            setSearchOpen(true);
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
          <SearchOverlay
            posts={posts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={closeSearch}
          />
        )}

       
    </header>
  );
}