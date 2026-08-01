import styles from "../styles/styles";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © {new Date().getFullYear()} From One to the Next. All rights reserved.
      </p>
    </footer>
  );
}