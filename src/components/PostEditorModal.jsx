import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "../styles/styles";

const POST_TYPES = [
  "Op-Ed",
  "Cafe Review",
  "Book Review",
  "Movie Review",
  "Travel Note",
  "Journal",
  "Other",
];

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div style={styles.richTextEditor}>
      <div style={styles.editorToolbar}>
        <button
          type="button"
          style={styles.editorButton}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          type="button"
          style={styles.editorButton}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>

        <button
          type="button"
          style={styles.editorButton}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          type="button"
          style={styles.editorButton}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          type="button"
          style={styles.editorButton}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullets
        </button>

        <button
          type="button"
          style={styles.editorButton}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbers
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
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
  const isExistingPost = posts.some((post) => post.id === draft.id);

  function updateDraft(field, value) {
    setDraft({
      ...draft,
      [field]: value,
    });
  }

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalTop}>
          <h2>{isExistingPost ? "Edit post" : "New post"}</h2>

          <button style={styles.ghostButton} onClick={closeEditor}>
            ✕
          </button>
        </div>

        <input
          style={styles.input}
          value={draft.title}
          onChange={(event) => updateDraft("title", event.target.value)}
          placeholder="Title"
        />

        <input
          style={styles.input}
          value={draft.author || ""}
          onChange={(event) => updateDraft("author", event.target.value)}
          placeholder="Author name"
        />

        <input
          style={styles.input}
          value={draft.authorImage || ""}
          onChange={(event) => updateDraft("authorImage", event.target.value)}
          placeholder="Author photo URL"
        />

        <input
          style={styles.input}
          value={draft.authorDescription || ""}
          onChange={(event) =>
            updateDraft("authorDescription", event.target.value)
          }
          placeholder="Author description, like Pastor, Frisco, Texas"
        />

        <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={draft.featured || false}
            onChange={(event) =>
              updateDraft("featured", event.target.checked)
            }
          />
          Feature this article on the homepage
        </label>

        <div style={styles.formGrid}>
          <select
            style={styles.select}
            value={draft.type}
            onChange={(event) => updateDraft("type", event.target.value)}
          >
            {POST_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <input
            style={styles.input}
            type="date"
            value={draft.date}
            onChange={(event) => updateDraft("date", event.target.value)}
          />

          <select
            style={styles.select}
            value={draft.rating}
            onChange={(event) =>
              updateDraft("rating", Number(event.target.value))
            }
          >
            <option value={0}>No rating</option>

            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}/5
              </option>
            ))}
          </select>
        </div>

        <label style={styles.uploadBox}>
          Add photo

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        {draft.image && (
          <img src={draft.image} alt="Draft" style={styles.previewImage} />
        )}

        <textarea
          style={{ ...styles.textarea, minHeight: "100px" }}
          value={draft.excerpt || ""}
          onChange={(event) => updateDraft("excerpt", event.target.value)}
          placeholder="Short homepage excerpt..."
        />

        <RichTextEditor
          value={draft.body}
          onChange={(html) => updateDraft("body", html)}
        />

        <div style={styles.buttonRow}>
          <button style={styles.primaryButton} onClick={savePost}>
            Save post
          </button>

          <button style={styles.secondaryButton} onClick={closeEditor}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}