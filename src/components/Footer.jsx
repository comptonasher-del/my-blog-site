import { useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../styles/styles";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe(event) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalizedEmail
    );

    if (!emailLooksValid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: normalizedEmail,
      });

    if (error) {
      if (error.code === "23505") {
        setStatus("success");
        setMessage("You’re already on the list.");
        return;
      }

      console.error("Newsletter signup failed:", error);
      setStatus("error");
      setMessage("Signup is not available yet. Please try again soon.");
      return;
    }

    setEmail("");
    setStatus("success");
    setMessage("You’re in. Watch your inbox.");
  }

  return (
    <footer id="subscribe" style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerNewsletterGrid}>
          <div>
            <p style={styles.footerEyebrow}>
  	    For Christian Young Adults
	    </p>

	    <h2 style={styles.footerHeading}>
            Helping one another follow Jesus in everyday life.
	    </h2>

	    <p style={styles.footerDescription}>
 	    Essays and conversations from Christian young adults, written to
 	    equip one another to follow Christ and share the Gospel in everyday
 	    life.
	    </p>
          </div>

          <form style={styles.footerForm} onSubmit={handleSubscribe}>
            <label htmlFor="newsletter-email" style={styles.footerLabel}>
              Email address
            </label>

            <div style={styles.footerInputRow}>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={styles.footerEmailInput}
              />

              <button
                type="submit"
                style={styles.footerSubscribeButton}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining..." : "Subscribe"}
              </button>
            </div>

            <p style={styles.footerFinePrint}>
              Thoughtful writing, honest conversation, and occasional updates.
            </p>

            {message && (
              <p
                role="status"
                style={{
                  ...styles.footerMessage,
                  ...(status === "error"
                    ? styles.footerMessageError
                    : {}),
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.footerBrand}>
            <span>FROM ONE TO</span>
            <span>THE NEXT</span>
          </div>

          <p style={styles.footerCopyright}>
            © {new Date().getFullYear()} From One to the Next. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}