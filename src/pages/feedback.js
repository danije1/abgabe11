import { useState, useEffect } from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import Link from "next/link";

export default function Home() {
  const [comments, setComments] = useState([]); // State für Kommentare
  const [comment, setComment] = useState(""); // State für das Eingabefeld

  // Kommentare beim Laden der Seite abrufen
  useEffect(() => {
    fetch("/api/route")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) =>
        console.error("Fehler beim Abrufen der Kommentare:", error)
      );
  }, []);

  // Kommentar hinzufügen
  const submitComment = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return; // Leere Kommentare verhindern

    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment }),
      });
      const newComment = await response.json();

      // Neu hinzugefügten Kommentar anzeigen
      setComments([newComment, ...comments]);
      setComment(""); // Eingabefeld zurücksetzen
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Kommentars:", error);
    }
  };

  // Kommentar löschen
  const deleteComment = async (id) => {
    try {
      const response = await fetch("/api/route", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();

      // Kommentar aus dem State entfernen
      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== id));
      } else {
        console.error("Fehler beim Löschen des Kommentars:", result);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Kommentars:", error);
    }
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          {/* Navigation zum Index */}
          <Link href="/" style={logoLinkStyle}>
            <Image
              src="/image/logo_sw.gif" // Ersetze mit deinem animierten Logo
              alt="Switch AI Logo"
              width={150}
              height={70}
            />
            <h1 style={h1Style}>switch.ai</h1>
          </Link>
        </div>
        <nav style={navStyle}>
          {/* Nur der "Feedback"-Link bleibt */}
          <Link href="/feedback">
            <span style={feedbackLinkStyle}>Feedback</span>{" "}
          </Link>
        </nav>
      </header>

      <section style={heroStyle}>
        <div style={commentSectionStyle}>
          <h1 style={feedbackHeaderStyle}>Feedback</h1>

          {/* Formular zum Hinzufügen von Kommentaren */}
          <form onSubmit={submitComment} style={formStyle}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Schreibe deinen Kommentar hier..."
              rows="4"
              style={textareaStyle}
            />
            <button type="submit" style={buttonStyle}>
              Absenden
            </button>
          </form>

          {/* Liste der Kommentare */}
          <h2 style={commentsHeaderStyle}>Kommentare:</h2>
          <div style={commentsContainerStyle}>
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} style={commentStyle}>
                  <p style={commentTextStyle}>{c.content}</p>
                  {/* Löschen-Button */}
                  <button
                    onClick={() => deleteComment(c.id)}
                    style={deleteButtonStyle}
                  >
                    &#10006;
                  </button>
                </div>
              ))
            ) : (
              <p style={noCommentsStyle}>Keine Kommentare bisher.</p>
            )}
          </div>
        </div>
      </section>

      <footer style={footerStyle}>
        <p>&copy; switch.ai All rights reserved.</p>
      </footer>
    </>
  );
}

const feedbackLinkStyle = {
  textDecoration: "none",
  color: "#0070f3",
  fontSize: "1.6rem", // Vergrößerte Schrift
  fontWeight: "700", // Dickere Schrift für besseres visuelles Gewicht
};

const headerStyle = {
  background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
  color: "#fff",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const h1Style = {
  margin: 0,
  fontSize: "1.8rem",
};

const logoLinkStyle = {
  textDecoration: "none", // Verhindert, dass der Link unterstrichen wird
  color: "#fff", // Weißer Text für den Link
  display: "flex",
  alignItems: "center",
};

const navStyle = {
  display: "flex",
  gap: "1rem",
};

const heroStyle = {
  position: "relative",
  height: "1400px",
  backgroundImage: 'url("/image/header.png")', // Ersetze mit deinem Hero-Bild
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
};

const commentSectionStyle = {
  maxWidth: "1200px", // Doppelte Breite
  margin: "20px auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const feedbackHeaderStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const textareaStyle = {
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#28a745", // Grüner Hintergrund
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const commentsHeaderStyle = {
  marginTop: "20px",
};

const commentsContainerStyle = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const commentStyle = {
  padding: "10px",
  marginBottom: "10px",
  borderBottom: "1px solid #ccc",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const commentTextStyle = {
  color: "#000", // Schriftfarbe der Kommentare auf schwarz gesetzt
};

const deleteButtonStyle = {
  backgroundColor: "red",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  padding: "5px 10px",
  cursor: "pointer",
  fontSize: "16px",
};

const noCommentsStyle = {
  textAlign: "center",
  color: "#999",
};

const footerStyle = {
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "#203a43",
  color: "#fff",
  marginTop: "2rem",
};
