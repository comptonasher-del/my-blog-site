import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import mammoth from "mammoth";
import DOMPurify from "dompurify";
import { CONTENT_CATEGORIES } from "../config/contentCategories";

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });


  useEffect(() => {
    if (!editor) return;

    const nextContent = value || "";

    if (editor.getHTML() !== nextContent) {
      editor.commands.setContent(nextContent, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  const currentTextStyle = editor.isActive(
    "heading",
    { level: 2 }
  )
    ? "heading2"
    : editor.isActive("heading", { level: 3 })
      ? "heading3"
      : "paragraph";

  function changeTextStyle(event) {
    const nextStyle = event.target.value;

    if (nextStyle === "heading2") {
      editor.chain().focus().setHeading({ level: 2 }).run();
    } else if (nextStyle === "heading3") {
      editor.chain().focus().setHeading({ level: 3 }).run();
    } else {
      editor.chain().focus().setParagraph().run();
    }
  }

  function toolbarStyle(isActive) {
    return `admin-rich-button${
      isActive ? " admin-rich-button-active" : ""
    }`;
  }

  return (
    <div className="admin-rich-editor">
      <div className="admin-rich-toolbar">
         
        <select
          className="admin-rich-style-select"
          value={currentTextStyle}
          onChange={changeTextStyle}
          aria-label="Text style"
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading2">Section heading</option>
          <option value="heading3">Subheading</option>
        </select>

        <button
          type="button"
          className={toolbarStyle(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          type="button"
          className={toolbarStyle(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          type="button"
          className={toolbarStyle(editor.isActive("bulletList"))}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          Bullets
        </button>

        <button
          type="button"
          className={toolbarStyle(editor.isActive("orderedList"))}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          Numbers
        </button>

        <button
          type="button"
          className={toolbarStyle(editor.isActive("blockquote"))}
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          Quote
        </button>

        <button
          type="button"
          className="admin-rich-button"
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>

        <button
          type="button"
          className="admin-rich-button"
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "A"
  );
}

export default function PostEditorModal({
  draft,
  setDraft,
  posts,
  savePost,
  closeEditor,
  handleImageUpload,
}) {
  const isExistingPost = posts.some(
    (post) => post.id === draft.id
  );

  const hasValidCategory =
    CONTENT_CATEGORIES.includes(draft.type);

  const [importingDocument, setImportingDocument] =
    useState(false);

  function updateDraft(field, value) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  }

  async function importWordDocument(file) {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".docx")) {
      window.alert(
        "Please choose a .docx Word document."
      );
      return;
    }

    const hasArticleText = (draft.body || "")
      .replace(/<[^>]*>/g, "")
      .trim();

    if (
      hasArticleText &&
      !window.confirm(
        "Importing this document will replace the current article text. Continue?"
      )
    ) {
      return;
    }

    setImportingDocument(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const result = await mammoth.convertToHtml(
        { arrayBuffer },
        {
          styleMap: [
            "p[style-name='Title'] => p:fresh",
            "p[style-name='Heading 1'] => h2:fresh",
            "p[style-name='Heading 2'] => h3:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
          ],
        }
      );

      const cleanHtml = DOMPurify.sanitize(
        result.value,
        {
          USE_PROFILES: { html: true },
        }
      );

      updateDraft("body", cleanHtml);

      if (!draft.title?.trim()) {
        const suggestedTitle = file.name
          .replace(/\.docx$/i, "")
          .replace(/[-_]+/g, " ");

        updateDraft("title", suggestedTitle);
      }

      if (result.messages.length > 0) {
        console.warn(
          "Word import warnings:",
          result.messages
        );
      }
    } catch (error) {
      console.error("Error importing Word document:", error);
      window.alert(
        "The Word document could not be imported."
      );
    } finally {
      setImportingDocument(false);
    }
  }

  async function handleDocumentInput(event) {
    const file = event.target.files?.[0];

    await importWordDocument(file);

    event.target.value = "";
  }

  function handleSave() {
    if (!draft.title?.trim()) {
      window.alert("Please add an article title.");
      return;
    }

    if (!hasValidCategory) {
      window.alert(
        "Please select Journal, Essays, or Reviews."
      );
      return;
    }

    savePost();
  }

  return (
    <div className="admin-editor-overlay">
      <div className="admin-editor-shell">
        <header className="admin-editor-header">
          <div className="admin-editor-header-copy">
            <p className="admin-editor-eyebrow">
              {isExistingPost
                ? "Editing article"
                : "New article"}
            </p>

            <h1 className="admin-editor-heading">
              {draft.title || "Untitled article"}
            </h1>
          </div>

          <div className="admin-editor-actions">
            <button
              type="button"
              className="admin-editor-button admin-editor-button-secondary"
              onClick={closeEditor}
            >
              Cancel
            </button>

            <button
              type="button"
              className="admin-editor-button admin-editor-button-primary"
              onClick={handleSave}
            >
              Save article
            </button>
          </div>
        </header>

        <div className="admin-editor-workspace">
          <main className="admin-editor-main">
            <section className="admin-editor-card">
              <label className="admin-editor-field">
                <span className="admin-editor-label">
                  Article title
                </span>

                <input
                  className="admin-editor-title-input"
                  value={draft.title || ""}
                  onChange={(event) =>
                    updateDraft("title", event.target.value)
                  }
                  placeholder="Give this article a title"
                  autoFocus
                />
              </label>
            </section>

            <section className="admin-editor-card">
              <h2 className="admin-editor-section-title">
                Featured image
              </h2>

              {draft.image ? (
                <img
                  className="admin-editor-image"
                  src={draft.image}
                  alt=""
                />
              ) : (
                <div className="admin-editor-image-placeholder">
                  Add a strong image that represents the
                  article and works well on the homepage.
                </div>
              )}

              <div className="admin-editor-image-actions">
                <label className="admin-editor-upload">
                  {draft.image
                    ? "Replace image"
                    : "Upload image"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageUpload(event, "image")
                    }
                    hidden
                  />
                </label>

                {draft.image && (
                  <button
                    type="button"
                    className="admin-editor-remove"
                    onClick={() => updateDraft("image", "")}
                  >
                    Remove
                  </button>
                )}
              </div>
            </section>

            <section className="admin-editor-card">
              <label className="admin-editor-field">
                <span className="admin-editor-label">
                  Homepage excerpt
                </span>

                <textarea
                  className="admin-editor-textarea"
                  value={draft.excerpt || ""}
                  maxLength={320}
                  onChange={(event) =>
                    updateDraft("excerpt", event.target.value)
                  }
                  placeholder="Write a short introduction that invites readers into the article."
                />

                <span className="admin-editor-counter">
                  {(draft.excerpt || "").length}/320
                </span>
              </label>
            </section>

            <section className="admin-editor-card">
              <h2 className="admin-editor-section-title">
                Article
              </h2>

              <div
                  className={`admin-document-import${
                    importingDocument
                      ? " admin-document-import-busy"
                      : ""
                }`}
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.preventDefault();

                  if (importingDocument) return;

                  const file = event.dataTransfer.files?.[0];
                  importWordDocument(file);
                }}
              >
                <label className="admin-document-import-label">
                  <input
                    type="file"
                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleDocumentInput}
                    hidden
                    disabled={importingDocument}
                  />

                  <span className="admin-document-import-badge">
                    DOCX
                  </span>
 
                  <strong className="admin-document-import-title">
                    {importingDocument
                      ? "Importing document..."
                      : "Drop a Word document here"}
                  </strong>

                  <span className="admin-document-import-text">
                    {importingDocument
                      ? "Converting and cleaning the article text"
                      : "or click to choose a .docx file"}
                    </span>
                  </label>
                </div>

              <RichTextEditor
                value={draft.body}
                onChange={(html) =>
                  updateDraft("body", html)
                }
              />
            </section>
          </main>

          <aside className="admin-editor-sidebar">
            <section className="admin-editor-card">
              <h2 className="admin-editor-section-title">
                Publication
              </h2>

              <label className="admin-editor-field">
                <span className="admin-editor-label">
                  Category
                </span>

                <select
                  className="admin-editor-select"
                  value={
                    hasValidCategory ? draft.type : ""
                  }
                  onChange={(event) =>
                    updateDraft("type", event.target.value)
                  }
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {CONTENT_CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="admin-editor-field">
                <span className="admin-editor-label">
                  Publish date
                </span>

                <input
                  className="admin-editor-input"
                  type="date"
                  value={draft.date || ""}
                  onChange={(event) =>
                    updateDraft("date", event.target.value)
                  }
                />
              </label>

               <div
                 style={{
                   marginTop: "22px",
                   paddingTop: "20px",
                   borderTop: "1px solid #ded8cf",
                 }}
               >
                 <label className="admin-editor-toggle">
                   <input
                     type="checkbox"
                     checked={draft.featured || false}
                     onChange={(event) =>
                       updateDraft(
                         "featured",
                         event.target.checked
                       )
                     }
                   />

                   Use as the{" "}
                   {hasValidCategory ? draft.type : "category"} banner
                 </label>

                 <label
                   className="admin-editor-toggle"
                   style={{ marginTop: "14px" }}
                 >
                   <input
                     type="checkbox"
                     checked={draft.featuredHome || false}
                     onChange={(event) =>
                       updateDraft(
                         "featuredHome",
                         event.target.checked
                       )
                     }
                   />

                   Use as the Home banner
                 </label>
               </div>

               
            </section>

            <section className="admin-editor-card">
              <h2 className="admin-editor-section-title">
                Author
              </h2>

              <div className="admin-editor-author">
                {draft.authorImage ? (
                  <img
                    className="admin-editor-avatar"
                    src={draft.authorImage}
                    alt={draft.author || "Author"}
                  />
                ) : (
                  <div className="admin-editor-avatar">
                    {getInitials(draft.author)}
                  </div>
                )}

                <div className="admin-editor-author-actions">
                  <label className="admin-editor-upload">
                    {draft.authorImage
                      ? "Replace photo"
                      : "Upload photo"}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(
                          event,
                          "authorImage"
                        )
                      }
                      hidden
                    />
                  </label>

                  {draft.authorImage && (
                    <button
                      type="button"
                      className="admin-editor-remove"
                      onClick={() =>
                        updateDraft("authorImage", "")
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <label className="admin-editor-field">
                <span className="admin-editor-label">
                  Author name
                </span>

                <input
                  className="admin-editor-input"
                  value={draft.author || ""}
                  onChange={(event) =>
                    updateDraft("author", event.target.value)
                  }
                  placeholder="Author name"
                />
              </label>

              <label className="admin-editor-field">
                <span className="admin-editor-label">
                  Author description
                </span>

                <textarea
                  className="admin-editor-textarea"
                  value={draft.authorDescription || ""}
                  onChange={(event) =>
                    updateDraft(
                      "authorDescription",
                      event.target.value
                    )
                  }
                  placeholder="Role, location, or a short author bio"
                />
              </label>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}