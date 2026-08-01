import ReactMarkdown from "react-markdown";
import styles from "../styles/styles";

export default function AboutPage({ content }) {
  return (
    <article style={styles.aboutCard}>
      <h1>About</h1>

      <div style={styles.markdownBody}>
        <ReactMarkdown>
          {content || "No about page has been written yet."}
        </ReactMarkdown>
      </div>
    </article>
  );
}