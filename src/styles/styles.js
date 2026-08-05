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
  boxSizing: "border-box",
},

heroOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 20,
  padding: "28px 40px 64px",
  background:
    "linear-gradient(180deg, rgba(8, 14, 22, 0.58) 0%, rgba(8, 14, 22, 0) 100%)",
},

heroStandard: {
  position: "relative",
  padding: "28px 40px",
  background: "#f7f4ef",
  borderBottom: "1px solid rgba(31, 41, 51, 0.12)",
  marginBottom: "40px",
},

headerInner: {
  position: "relative",
  zIndex: 110,  
  width: "100%",
  maxWidth: "1320px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "32px",
  flexWrap: "wrap",
},

compactLogo: {
  display: "grid",
  border: 0,
  padding: 0,
  background: "transparent",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: 0.95,
  letterSpacing: "-0.02em",
  textAlign: "left",
  cursor: "pointer",
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
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "22px 18px",
    width: "calc(100% - 48px)",
    margin: "0 auto",
    alignItems: "stretch",
  },

  sidebar: {
    display: "grid",
    gap: "18px",
    marginTop: "28px",
  },

featuredCard: {
  gridColumn: "1 / -1",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",  
  height: "clamp(560px, 72vh, 720px)",
  display: "flex",
  alignItems: "flex-end",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "#18212f",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0 30px 90px rgba(24, 33, 47, 0.18)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
},

featuredContent: {
  width: "100%",
  maxWidth: "760px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "120px clamp(40px, 6vw, 76px) clamp(40px, 6vw, 76px)",
  boxSizing: "border-box",
},

featuredContentLong: {
  justifyContent: "center",
  paddingTop: "170px",
  paddingBottom: "48px",
},

featuredMeta: {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#d8cbb8",
},

featuredTitle: {
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(40px, 4.6vw, 68px)",
  fontWeight: 700,
  lineHeight: 1.02,
  letterSpacing: "-0.045em",
  margin: "18px 0 22px",
  color: "#fffaf3",
  textWrap: "balance",
},

featuredTitleLong: {
  fontSize: "clamp(30px, 3.1vw, 46px)",
  lineHeight: 0.98,
  maxWidth: "640px",
  margin: "12px 0 18px",
},

featuredDeck: {
  fontFamily: "Georgia, serif",
  fontSize: "clamp(17px, 2vw, 20px)",
  lineHeight: 1.7,
  maxWidth: "620px",
  margin: "0 0 32px",
  color: "rgba(255, 250, 243, 0.78)",
},

featuredReadLink: {
  display: "inline-block",
  color: "#fffaf3",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.11em",
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255, 250, 243, 0.6)",
  paddingBottom: "6px",
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
  justifyContent: "flex-end",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px 30px",
  margin: 0,
  padding: 0,
  border: 0,
  fontSize: "14px",
  fontWeight: 600,
},

navLink: {
  textDecoration: "none",
  background: "transparent",
  border: 0,
  borderBottom: "1px solid transparent",
  cursor: "pointer",
  font: "inherit",
  fontWeight: 600,
  padding: "4px 0 6px",
},

navLinkActive: {
  borderBottomWidth: "1px",
},

searchButton: {
  background: "transparent",
  border: 0,
  cursor: "pointer",
  fontSize: "21px",
  lineHeight: 1,
  padding: "0 4px",
},

headerSubscribeButton: {
  border: "1px solid",
  background: "transparent",
  padding: "10px 16px",
  fontFamily: "inherit",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
},

mobileMenuButton: {
  display: "none",
  border: 0,
  background: "transparent",
  padding: "2px 4px",
  fontSize: "27px",
  lineHeight: 1,
  cursor: "pointer",
},

mobileMenuPanel: {
  background: "#f7f4ef",
},

mobileMenuLink: {
  width: "100%",
  border: 0,
  borderBottom: "1px solid #e5dfd6",
  background: "transparent",
  padding: "13px 2px",
  textAlign: "left",
  fontFamily: "inherit",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
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
  margin: "42px 0 2px",
  padding: 0,
  border: 0,
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.11em",
  textTransform: "uppercase",
  color: "#18212f",
},

card: {
  background: "#fffdf9",
  border: "1px solid #e5dfd6",
  borderRadius: "2px",
  boxShadow: "none",
  overflow: "hidden",
  minWidth: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
},

cardBody: {
  padding: "18px 16px 20px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
},
  
cardHover: {
  background: "#fffdf9",
  border: "1px solid #d8d0c5",
  borderRadius: "2px",
  boxShadow: "0 14px 36px rgba(24, 33, 47, 0.1)",
  overflow: "hidden",
  minWidth: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transform: "translateY(-4px)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
},

postImage: {
  width: "100%",
  aspectRatio: "16 / 10",
  height: "auto",
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
  color: "#8a8177",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "9px",
},

postTitle: {
  margin: "0 0 10px",
  fontSize: "22px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontWeight: 700,
  letterSpacing: "-0.035em",
  lineHeight: 1.15,
  color: "#18212f",
},

bodyText: {
  fontFamily: "Georgia, serif",
  fontSize: "14px",
  lineHeight: 1.55,
  color: "#68635d",
  margin: "0 0 18px",
},

readLink: {
  display: "inline-block",
  marginTop: "auto",
  color: "#18212f",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
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
  display: "inline-flex",
  zIndex: 30,
},

shareButton: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "9px",
  border: "1px solid rgba(24, 33, 47, 0.28)",
  borderRadius: "999px",
  padding: "10px 14px",
  background: "#fffaf3",
  color: "#18212f",
  boxShadow: "0 5px 18px rgba(24, 33, 47, 0.08)",
  fontFamily: "inherit",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition:
    "background 160ms ease, color 160ms ease, transform 160ms ease",
},

shareButtonIcon: {
  fontSize: "15px",
  lineHeight: 1,
  transform: "translateY(-1px)",
},

shareButtonChevron: {
  fontSize: "7px",
  lineHeight: 1,
  opacity: 0.58,
},

shareMenu: {
  position: "absolute",
  top: "calc(100% + 12px)",
  right: 0,
  width: "min(330px, calc(100vw - 32px))",
  padding: "18px",
  boxSizing: "border-box",
  border: "1px solid rgba(24, 33, 47, 0.14)",
  borderRadius: "12px",
  background: "#fffaf3",
  boxShadow: "0 24px 65px rgba(24, 33, 47, 0.2)",
  zIndex: 300,
},

shareMenuEyebrow: {
  margin: "0 0 7px",
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "#817568",
},

shareMenuTitle: {
  margin: 0,
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.3,
  color: "#18212f",
},

shareMenuDivider: {
  height: "1px",
  margin: "16px 0 7px",
  background: "rgba(24, 33, 47, 0.14)",
},

shareMenuItem: {
  display: "grid",
  gridTemplateColumns: "36px minmax(0, 1fr)",
  gap: "12px",
  alignItems: "center",
  width: "100%",
  padding: "10px",
  boxSizing: "border-box",
  border: 0,
  borderRadius: "8px",
  background: "transparent",
  color: "#18212f",
  fontFamily: "inherit",
  textAlign: "left",
  textDecoration: "none",
  cursor: "pointer",
  transition:
    "background 150ms ease, transform 150ms ease",
},

shareMenuIcon: {
  display: "grid",
  placeItems: "center",
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  background: "rgba(24, 33, 47, 0.08)",
  fontSize: "13px",
  fontWeight: 700,
  color: "#18212f",
},

shareMenuItemText: {
  display: "grid",
  gap: "2px",
  minWidth: 0,
},

shareMenuItemLabel: {
  fontSize: "13px",
  fontWeight: 700,
  color: "#18212f",
},

shareMenuItemNote: {
  fontSize: "11px",
  lineHeight: 1.35,
  color: "#817568",
},

footer: {
  width: "100%",
  marginTop: "96px",
  padding: "clamp(56px, 7vw, 88px) 24px 32px",
  boxSizing: "border-box",
  background: "#18212f",
  color: "#fffaf3",
},

footerInner: {
  width: "100%",
  maxWidth: "1180px",
  margin: "0 auto",
},

footerNewsletterGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "48px 80px",
  alignItems: "end",
  paddingBottom: "52px",
},

footerEyebrow: {
  margin: "0 0 18px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#cbbda8",
},

footerHeading: {
  maxWidth: "620px",
  margin: "0 0 20px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(38px, 5vw, 64px)",
  lineHeight: 1.02,
  letterSpacing: "-0.045em",
  color: "#fffaf3",
},

footerDescription: {
  maxWidth: "580px",
  margin: 0,
  fontFamily: "Georgia, serif",
  fontSize: "17px",
  lineHeight: 1.7,
  color: "rgba(255, 250, 243, 0.7)",
},

footerForm: {
  width: "100%",
  maxWidth: "500px",
  justifySelf: "end",
},

footerLabel: {
  display: "block",
  marginBottom: "10px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#fffaf3",
},

footerInputRow: {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
},

footerEmailInput: {
  flex: "1 1 240px",
  minWidth: 0,
  boxSizing: "border-box",
  border: "1px solid rgba(255, 250, 243, 0.32)",
  borderRadius: 0,
  padding: "16px 18px",
  background: "rgba(255, 255, 255, 0.06)",
  color: "#fffaf3",
  fontFamily: "inherit",
  fontSize: "16px",
  outline: "none",
},

footerSubscribeButton: {
  flex: "0 0 auto",
  border: "1px solid #fffaf3",
  borderRadius: 0,
  padding: "16px 24px",
  background: "#fffaf3",
  color: "#18212f",
  fontFamily: "inherit",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
},

footerFinePrint: {
  margin: "12px 0 0",
  fontSize: "12px",
  lineHeight: 1.5,
  color: "rgba(255, 250, 243, 0.52)",
},

footerMessage: {
  margin: "14px 0 0",
  fontSize: "14px",
  color: "#d8cbb8",
},

footerMessageError: {
  color: "#f2b8b5",
},

footerBottom: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
  gap: "24px",
  paddingTop: "30px",
  borderTop: "1px solid rgba(255, 250, 243, 0.16)",
},

footerBrand: {
  display: "grid",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: 0.95,
  letterSpacing: "-0.025em",
},

footerCopyright: {
  margin: 0,
  fontSize: "12px",
  color: "rgba(255, 250, 243, 0.52)",
},

articleEnd: {
  maxWidth: "720px",
  margin: "72px auto 0",
  paddingTop: "40px",
  borderTop: "1px solid rgba(31, 41, 51, 0.18)",
},

articleEndEyebrow: {
  margin: "0 0 14px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#817568",
},

articleEndTitle: {
  margin: "0 0 14px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(28px, 4vw, 42px)",
  lineHeight: 1.15,
  letterSpacing: "-0.035em",
  color: "#18212f",
},

articleEndText: {
  maxWidth: "610px",
  margin: "0 0 24px",
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#6b6258",
},

articleEndActions: {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "12px",
},

articleEndSubscribeButton: {
  border: "1px solid #18212f",
  padding: "11px 18px",
  background: "#18212f",
  color: "#fffaf3",
  fontFamily: "inherit",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
},


relatedSection: {
  width: "100%",
  maxWidth: "1120px",
  margin: "80px auto 0",
  padding: "0 24px",
  boxSizing: "border-box",
},

relatedEyebrow: {
  margin: "0 0 12px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#817568",
},

relatedHeading: {
  margin: "0 0 32px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(28px, 4vw, 42px)",
  lineHeight: 1.15,
  letterSpacing: "-0.035em",
  color: "#18212f",
},

relatedGrid: {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "28px",
},

topicSection: {
  gridColumn: "1 / -1",
  width: "100%",
  marginTop: "96px",
},

topicEyebrow: {
  margin: "0 0 12px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#817568",
},

topicHeading: {
  maxWidth: "620px",
  margin: "0 0 34px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(30px, 4vw, 46px)",
  lineHeight: 1.12,
  letterSpacing: "-0.04em",
  color: "#18212f",
},

topicGrid: {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
},

topicCard: {
  position: "relative",
  minHeight: "390px",
  padding: 0,
  overflow: "hidden",
  border: 0,
  borderRadius: "2px",
  backgroundColor: "#263244",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: "#fffaf3",
  textAlign: "left",
  cursor: "pointer",
},

topicCardContent: {
  position: "absolute",
  right: 0,
  bottom: 0,
  left: 0,
  padding: "30px",
},

topicCardLabel: {
  display: "block",
  marginBottom: "12px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "30px",
  fontWeight: 700,
  lineHeight: 1.1,
},

topicCardDescription: {
  maxWidth: "340px",
  minHeight: "52px",
  margin: "0 0 20px",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "rgba(255, 250, 243, 0.8)",
},

topicCardLink: {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
},

searchOverlayBackdrop: {
  position: "fixed",
  inset: 0,
  zIndex: 500,
  display: "grid",
  placeItems: "start center",
  padding: "clamp(18px, 5vw, 64px)",
  boxSizing: "border-box",
  overflowY: "auto",
  background: "rgba(15, 23, 34, 0.78)",
  backdropFilter: "blur(8px)",
},

searchOverlayPanel: {
  width: "100%",
  maxWidth: "900px",
  marginTop: "clamp(20px, 6vh, 70px)",
  padding: "clamp(24px, 5vw, 52px)",
  boxSizing: "border-box",
  background: "#fffaf3",
  boxShadow:
    "0 30px 90px rgba(15, 23, 34, 0.28)",
},

searchOverlayHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "24px",
  marginBottom: "30px",
},

searchOverlayEyebrow: {
  margin: "0 0 10px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#817568",
},

searchOverlayTitle: {
  margin: 0,
  fontFamily:
    "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(28px, 4vw, 44px)",
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  color: "#18212f",
},

searchOverlayClose: {
  flex: "0 0 auto",
  border: 0,
  padding: "6px",
  background: "transparent",
  color: "#18212f",
  fontSize: "22px",
  cursor: "pointer",
},

searchOverlayInput: {
  width: "100%",
  boxSizing: "border-box",
  border: 0,
  borderBottom: "2px solid #18212f",
  borderRadius: 0,
  padding: "14px 0",
  background: "transparent",
  color: "#18212f",
  fontFamily:
    "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(20px, 3vw, 30px)",
  outline: "none",
},

searchOverlayResults: {
  display: "grid",
  marginTop: "28px",
},

searchOverlayMessage: {
  margin: 0,
  padding: "28px 0",
  fontSize: "15px",
  color: "#6b6258",
},

searchResult: {
  display: "grid",
  gridTemplateColumns: "120px minmax(0, 1fr)",
  gap: "20px",
  padding: "20px 0",
  borderBottom:
    "1px solid rgba(24, 33, 47, 0.14)",
  color: "#18212f",
  textDecoration: "none",
},

searchResultImage: {
  width: "120px",
  height: "88px",
  objectFit: "cover",
},

searchResultImagePlaceholder: {
  width: "120px",
  height: "88px",
  background: "#d8d0c5",
},

searchResultContent: {
  minWidth: 0,
},

searchResultMeta: {
  margin: "0 0 7px",
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#817568",
},

searchResultTitle: {
  margin: "0 0 7px",
  fontFamily:
    "'Libre Baskerville', Georgia, serif",
  fontSize: "21px",
  lineHeight: 1.2,
  letterSpacing: "-0.025em",
  color: "#18212f",
},

searchResultExcerpt: {
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.5,
  color: "#6b6258",
},

aboutPage: {
  width: "100%",
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "56px 24px 0",
  boxSizing: "border-box",
  color: "#18212f",
},

aboutHero: {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.7fr)",
  gap: "clamp(40px, 7vw, 90px)",
  alignItems: "end",
  padding: "24px 0 64px",
},

aboutEyebrow: {
  margin: "0 0 16px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#817568",
},

aboutHeroTitle: {
  maxWidth: "790px",
  margin: 0,
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(45px, 7vw, 82px)",
  lineHeight: 1,
  letterSpacing: "-0.055em",
  color: "#18212f",
},

aboutHeroCopy: {
  display: "grid",
  gap: "18px",
  fontFamily: "Georgia, serif",
  fontSize: "17px",
  lineHeight: 1.75,
  color: "#5f584f",
},

aboutPurposeSection: {
  padding: "64px 0",
  borderTop: "1px solid rgba(24, 33, 47, 0.16)",
},

aboutSectionTitle: {
  maxWidth: "820px",
  margin: "0 0 30px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(34px, 5vw, 58px)",
  lineHeight: 1.08,
  letterSpacing: "-0.045em",
  color: "#18212f",
},

aboutPurposeCopy: {
  maxWidth: "720px",
  display: "grid",
  gap: "20px",
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.8,
  color: "#5f584f",
},

aboutPrinciplesGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  borderTop: "1px solid rgba(24, 33, 47, 0.16)",
  borderBottom: "1px solid rgba(24, 33, 47, 0.16)",
},

aboutPrinciple: {
  padding: "36px 28px 40px 0",
},

aboutPrincipleNumber: {
  margin: "0 0 26px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  color: "#a28d74",
},

aboutPrincipleTitle: {
  margin: "0 0 18px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "27px",
  lineHeight: 1.15,
  color: "#18212f",
},

aboutPrincipleText: {
  margin: 0,
  fontSize: "15px",
  lineHeight: 1.75,
  color: "#6b6258",
},

aboutWritingSection: {
  padding: "68px 0",
},

aboutValuesGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0 64px",
  marginTop: "38px",
  borderTop: "1px solid rgba(24, 33, 47, 0.16)",
},

aboutValue: {
  padding: "26px 0",
  borderBottom: "1px solid rgba(24, 33, 47, 0.16)",
},

aboutValueTitle: {
  margin: "0 0 12px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "22px",
  color: "#18212f",
},

aboutValueText: {
  maxWidth: "500px",
  margin: 0,
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#6b6258",
},

aboutStorySection: {
  maxWidth: "820px",
  margin: "0 auto",
  padding: "54px 0",
  borderTop: "1px solid rgba(24, 33, 47, 0.16)",
},

aboutStoryContent: {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  lineHeight: 1.8,
  color: "#4f4a44",
},

aboutTeamSection: {
  padding: "68px 0",
  borderTop: "1px solid rgba(24, 33, 47, 0.16)",
},

aboutTeamHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "30px",
  marginBottom: "44px",
},

aboutAdminButton: {
  flex: "0 0 auto",
  border: "1px solid #18212f",
  padding: "12px 18px",
  background: "#18212f",
  color: "#fffaf3",
  fontFamily: "inherit",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
},

aboutTeamGroup: {
  marginTop: "44px",
},

aboutTeamGroupTitle: {
  margin: "0 0 24px",
  paddingBottom: "14px",
  borderBottom: "1px solid rgba(24, 33, 47, 0.16)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#817568",
},

aboutTeamGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "34px 28px",
},

aboutTeamCard: {
  minWidth: 0,
},

aboutTeamImage: {
  display: "block",
  width: "100%",
  aspectRatio: "4 / 5",
  objectFit: "cover",
  background: "#d8d0c5",
},

aboutTeamPlaceholder: {
  display: "grid",
  placeItems: "center",
  width: "100%",
  aspectRatio: "4 / 5",
  background: "#d8d0c5",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(42px, 6vw, 72px)",
  color: "#817568",
},

aboutTeamCardBody: {
  paddingTop: "16px",
},

aboutTeamRole: {
  margin: "0 0 8px",
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#817568",
},

aboutTeamName: {
  margin: "0 0 14px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "26px",
  lineHeight: 1.15,
  color: "#18212f",
},

aboutTeamBio: {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#6b6258",
},

aboutEditButton: {
  marginTop: "18px",
  border: "1px solid #18212f",
  padding: "9px 14px",
  background: "transparent",
  color: "#18212f",
  fontFamily: "inherit",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
},

aboutClosingSection: {
  margin: "12px -24px 0",
  padding: "clamp(48px, 7vw, 76px) 24px",
  boxSizing: "border-box",
  background: "#18212f",
  color: "#fffaf3",
  textAlign: "center",
},

aboutClosingEyebrow: {
  margin: "0 0 18px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#cbbda8",
},

aboutClosingTitle: {
  maxWidth: "820px",
  margin: "0 auto 24px",
  fontFamily: "'Libre Baskerville', Georgia, serif",
  fontSize: "clamp(36px, 6vw, 66px)",
  lineHeight: 1.05,
  letterSpacing: "-0.05em",
},

aboutClosingText: {
  maxWidth: "650px",
  margin: "0 auto 30px",
  fontSize: "16px",
  lineHeight: 1.7,
  color: "rgba(255, 250, 243, 0.7)",
},

aboutClosingActions: {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "12px",
},

aboutPrimaryLink: {
  display: "inline-block",
  padding: "13px 20px",
  border: "1px solid #fffaf3",
  background: "#fffaf3",
  color: "#18212f",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
},

aboutSecondaryButton: {
  padding: "13px 20px",
  border: "1px solid rgba(255, 250, 243, 0.7)",
  background: "transparent",
  color: "#fffaf3",
  fontFamily: "inherit",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
},
};

export default styles;