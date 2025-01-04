import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Feedback() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

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
    if (comment.trim() === "") return;

    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment }),
      });
      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setComment("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Kommentars:", error);
    }
  };

  // Kommentar löschen
  const deleteComment = async (id) => {
    try {
      await fetch(`/api/route?id=${id}`, { method: "DELETE" });
      setComments(comments.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen des Kommentars:", error);
    }
  };

  return (
    <>
      <div style={pageStyle}>
        <header style={headerStyle}>
          <div style={logoContainerStyle}>
            <Link href="/" style={logoLinkStyle}>
              <Image
                src="/image/logo_sw.gif"
                alt="Switch AI Logo"
                width={150}
                height={70}
              />
            </Link>
            <Link href="/" style={h1Style}>
              switch.ai
            </Link>
          </div>
          <nav style={navStyle}>
            <a href="#about" style={linkStyle}>
              About
            </a>
            <a href="#services" style={linkStyle}>
              Services
            </a>
            <Link href="/feedback" style={linkStyle}>
              Contact
            </Link>
          </nav>
        </header>

        <div style={containerStyle}>
          <h1 style={headerStyleFeedback}>Feedback</h1>

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

          <h2 style={commentsHeaderStyle}>Kommentare:</h2>
          <div style={commentsContainerStyle}>
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} style={commentStyle}>
                  <div style={commentHeaderStyle}>Kommentar ID: {c.id}</div>
                  <p>{c.content}</p>
                  <button
                    onClick={() => deleteComment(c.id)}
                    style={deleteButtonStyle}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p style={noCommentsStyle}>Keine Kommentare bisher.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Styles
const pageStyle = {
  backgroundColor: "#0f1c25",
  minHeight: "100vh",
  color: "#E0E0E0",
  margin: 0,
  fontFamily: "'Arial', sans-serif",
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

const logoLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const h1Style = {
  margin: 0,
  fontSize: "1.8rem",
  textDecoration: "none",
  color: "#fff",
  cursor: "pointer",
};

const navStyle = {
  display: "flex",
  gap: "1rem",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

const containerStyle = {
  padding: "40px",
  maxWidth: "700px",
  margin: "auto",
  backgroundColor: "#1A2530",
  color: "#E0E0E0",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const headerStyleFeedback = {
  fontSize: "2.5rem",
  fontWeight: "600",
  marginBottom: "20px",
  textAlign: "center",
  color: "#00D9F1",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "30px",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #333",
  backgroundColor: "#2A3842",
  color: "#E0E0E0",
  resize: "none",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#00D9F1",
  color: "#1A2530",
  fontSize: "16px",
  fontWeight: "600",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const commentsHeaderStyle = {
  fontSize: "1.8rem",
  fontWeight: "500",
  marginBottom: "20px",
  textAlign: "center",
  color: "#00D9F1",
};

const commentsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const commentStyle = {
  backgroundColor: "#2A3842",
  padding: "15px",
  borderRadius: "8px",
  color: "#E0E0E0",
  fontSize: "16px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
};

const commentHeaderStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const deleteButtonStyle = {
  backgroundColor: "#FF5C5C",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  padding: "5px 10px",
  marginTop: "10px",
};

const noCommentsStyle = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "#C0C0C0",
};
