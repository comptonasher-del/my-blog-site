const styles = {

  page: {
    minHeight: "100vh",
    background: "#f7f4ef",
    color: "#1f2933",
    fontFamily: "Inter, system-ui, sans-serif",
    padding: "0 0 40px",
  },
hero: {
  width: "100%",
  background: "#f7f4ef",
  borderBottom: "1px solid rgba(31, 41, 51, 0.12)",
  padding: "48px 24px 28px",
  boxSizing: "border-box",
  margin: "0 0 56px",
},
 title: {
  fontSize: "clamp(48px, 8vw, 104px)",
  lineHeight: 0.92,
  margin: "0",
  letterSpacing: "-0.065em",
  fontWeight: 700,
  fontFamily: "'Libre Baskerville', Georgia, serif",
  color: "#18212f",
},

  subtitle: {
  fontSize: "clamp(16px, 2vw, 20px)",
  color: "#6b6258",
  maxWidth: "680px",
  margin: "22px auto 0",
  lineHeight: 1.6,
},

homepageIntro: {
  maxWidth: "680px",
  margin: "20px auto 0",
  color: "#6b6258",
  fontSize: "16px",
  lineHeight: 1.7,
  textAlign: "center",
},

aboutCard: {
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  padding: "32px",
  boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
  overflow: "hidden",
},

  adminHeaderControls: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "18px",
  },

 postPageLayout: {
  maxWidth: "760px",
  margin: "0 auto",
  padding: "56px 24px",
},
articlePage: {
  marginTop: "24px",
  background: "transparent",
  border: "none",
  boxShadow: "none",
},
articleMetaRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "40px",
},
articleMastheadLink: {
  display: "block",
  textAlign: "center",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "22px",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#1f2933",
  textDecoration: "none",
  marginBottom: "40px",
},
richTextEditor: {
  minHeight: "260px",
  border: "1px solid #d4d4d8",
  borderRadius: "16px",
  padding: "18px",
  fontSize: "18px",
  lineHeight: 1.7,
  background: "white",
},
articleHeader: {
  marginBottom: "48px",
},

articleDate: {
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "18px",
},

articleAuthor: {
  textAlign: "center",
  marginTop: "24px",
  marginBottom: "48px",
  fontSize: "16px",
  color: "#4b5563",
},
authorBlock: {
  display: "flex",
  alignItems: "center",
  gap: "14px",
},
authorPhoto: {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  objectFit: "cover",
},

authorName: {
  fontSize: "16px",
  fontWeight: 600,
  color: "#374151",
},

authorDescription: {
  marginTop: "4px",
  fontSize: "15px",
  color: "#6b7280",
},
articleHeroImage: {
  width: "100%",
  maxHeight: "520px",
  objectFit: "cover",
  margin: "32px auto 24px",
  display: "block",
},
articleTitle: {
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "64px",
  lineHeight: 1.05,
  fontWeight: 700,
  letterSpacing: "-0.045em",
  textAlign: "center",
  maxWidth: "980px",
  margin: "0 auto 36px",
  color: "#1f2933",
},
adminMetrics: {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
  maxWidth: "760px",
  margin: "-24px auto 40px",
  padding: "12px 0",
  borderTop: "1px solid #e5e7eb",
  borderBottom: "1px solid #e5e7eb",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: 600,
},
editorToolbar: {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "12px",
  paddingBottom: "12px",
  borderBottom: "1px solid #e5e7eb",
},

editorButton: {
  border: "1px solid #d4d4d8",
  background: "#fafafa",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "14px",
  cursor: "pointer",
},
  layout: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "block",
  },

  posts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "28px",
  },

  sidebar: {
    display: "grid",
    gap: "18px",
    marginTop: "28px",
  },

  featuredCard: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
    alignItems: "center",
    background: "#fffaf3",
    border: "1px solid #eadfce",
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
   cursor: "pointer",
transition: "transform 0.15s ease, box-shadow 0.15s ease",
},
  featuredImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    display: "block",
    borderRadius: "18px",
  },

  featuredMeta: {
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#71717a",
  },

  featuredTitle: {
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: "52px",
    fontWeight: "800",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    margin: "12px 0 16px",
    color: "#18181b",
  },

  featuredDeck: {
  fontFamily: "Georgia, serif",
  fontSize: "16px",
  marginBottom: "20px",
  fontStyle: "italic",
  color: "#5f6368",
  lineHeight: 1.7,
},
featuredCardHover: {
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "32px",
  alignItems: "center",
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  padding: "32px",
  boxShadow: "0 28px 70px rgba(31,41,51,0.12)",
  cursor: "pointer",
  transform: "translateY(-4px)",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
},
masthead: {
  maxWidth: "1180px",
  margin: "0 auto",
  textAlign: "center",
},

nav: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px 28px",
  marginTop: "36px",
  paddingTop: "20px",
  borderTop: "1px solid rgba(31, 41, 51, 0.12)",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.11em",
  textTransform: "uppercase",
},

navLink: {
  color: "#4c5562",
  textDecoration: "none",
  background: "transparent",
  border: 0,
  borderBottom: "1px solid transparent",
  cursor: "pointer",
  font: "inherit",
  fontWeight: 700,
  letterSpacing: "0.11em",
  textTransform: "uppercase",
  padding: "8px 0",
},

navLinkActive: {
  color: "#18212f",
  borderBottom: "1px solid #18212f",
},

searchButton: {
  background: "transparent",
  border: 0,
  cursor: "pointer",
  fontSize: "23px",
  lineHeight: 1,
  padding: "4px 6px",
  color: "#18212f",
},

searchWrapper: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginTop: "18px",
},

searchInput: {
  width: "100%",
  maxWidth: "420px",
  padding: "12px 18px",
  borderRadius: "999px",
  border: "1px solid #d4d4d8",
  fontSize: "16px",
  background: "#ffffff",
  outline: "none",
},

closeSearch: {
  border: 0,
  background: "transparent",
  cursor: "pointer",
  fontSize: "18px",
},
  sectionHeading: {
    gridColumn: "1 / -1",
    fontSize: "22px",
    margin: "8px 0 -8px",
    borderTop: "1px solid #eadfce",
    paddingTop: "24px",
  },

  card: {
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  boxShadow: "0 18px 50px rgba(31, 41, 51, 0.07)",
  overflow: "hidden",
  height: "fit-content",
  cursor: "pointer",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
},

  cardBody: {
    padding: "24px",
  },
cardHover: {
  background: "#fffaf3",
  border: "1px solid #eadfce",
  borderRadius: "28px",
  boxShadow: "0 24px 60px rgba(31,41,51,0.12)",
  overflow: "hidden",
  height: "fit-content",
  cursor: "pointer",
  transform: "translateY(-3px)",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
},
  postImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },

  previewImage: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "cover",
    borderRadius: "18px",
  },

  meta: {
    color: "#71717a",
    fontSize: "14px",
    marginBottom: "10px",
  },

  postTitle: {
    margin: "12px 0",
    fontSize: "34px",
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontWeight: "800",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    color: "#1b2538",
  },

  bodyText: {
    whiteSpace: "pre-wrap",
fontFamily: "Georgia, serif",
  fontSize: "15px",
  lineHeight: 1.55,
  color: "#6b7280",
  margin: "0 0 14px",
  },

  readLink: {
    color: "#18181b",
    fontWeight: "bold",
    textDecoration: "none",
  },

markdownBody: {
  fontFamily: "'Source Serif 4', Georgia, serif",
  fontSize: "22px",
  lineHeight: 1.75,
  color: "#111827",
},

  markdownH1: {
    fontSize: "32px",
    margin: "24px 0 12px",
  },

  markdownH2: {
    fontSize: "24px",
    margin: "22px 0 10px",
  },

  markdownList: {
    paddingLeft: "24px",
    margin: "12px 0",
    listStyleType: "disc",
  },

  markdownListItem: {
    marginBottom: "6px",
  },

  markdownQuote: {
    borderLeft: "4px solid #d4d4d8",
    paddingLeft: "16px",
    color: "#52525b",
    fontStyle: "italic",
    margin: "18px 0",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d4d4d8",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "16px",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d4d4d8",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "16px",
    background: "white",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d4d4d8",
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "16px",
    minHeight: "220px",
    resize: "vertical",
    fontFamily: "inherit",
  },

  primaryButton: {
    border: 0,
    background: "#18181b",
    color: "white",
    borderRadius: "16px",
    padding: "14px 18px",
    fontSize: "16px",
    cursor: "pointer",
  },

  secondaryButton: {
    border: 0,
    background: "#e4e4e7",
    color: "#18181b",
    borderRadius: "16px",
    padding: "12px 16px",
    fontSize: "15px",
    cursor: "pointer",
  },

  ghostButton: {
    border: 0,
    background: "transparent",
    color: "#52525b",
    borderRadius: "16px",
    padding: "12px 16px",
    fontSize: "15px",
    cursor: "pointer",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  modal: {
    background: "white",
    borderRadius: "28px",
    padding: "28px",
    width: "100%",
    maxWidth: "760px",
    maxHeight: "90vh",
    overflow: "auto",
    display: "grid",
    gap: "16px",
  },

  modalTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
  },

  uploadBox: {
    border: "1px dashed #a1a1aa",
    background: "#fafafa",
    padding: "18px",
    textAlign: "center",
    borderRadius: "18px",
    cursor: "pointer",
    color: "#52525b",
  },
shareWrapper: {
  position: "relative",
},
shareButton: {
  border: "1px solid #d4d4d8",
  background: "#fffaf3",
  color: "#1f2933",
  borderRadius: "999px",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
},

shareMenu: {
  position: "absolute",
  top: "44px",
  right: 0,
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  padding: "8px",
  display: "grid",
  gap: "4px",
  zIndex: 10,
},

shareMenuItem: {
  border: 0,
  background: "transparent",
  color: "#1f2933",
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  textAlign: "left",
  cursor: "pointer",
  whiteSpace: "nowrap",
},
};

export default styles;