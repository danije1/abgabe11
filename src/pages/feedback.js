import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GET, POST, DELETE } from "./route.js";

export default function Feedback() {
  // Zustände für den Kommentar
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Holen der Kommentare von der API (GET)
  const fetchComments = async () => {
    try {
      const response = await GET();
      if (response.status === 200) {
        const data = await response.json();
        setComments(data); // Kommentare in den State setzen
      } else {
        console.error("Fehler beim Abrufen der Kommentare");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Kommentare:", error);
    }
  };

  // Laden der Kommentare beim ersten Rendern
  useEffect(() => {
    fetchComments();
  }, []);

  // Funktion zum Hinzufügen eines Kommentars (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Kommentar-Objekt erstellen
      const newComment = { comment };

      try {
        const response = await POST(newComment);
        if (response.status === 201) {
          // Kommentar erfolgreich hinzugefügt, hole die aktuellen Kommentare
          fetchComments();
        } else {
          console.error("Fehler beim Hinzufügen des Kommentars");
        }
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Kommentars:", error);
      }

      // Kommentar-Eingabe zurücksetzen
      setComment("");
    }
  };

  // Kommentar löschen (DELETE)
  const handleDelete = async (id) => {
    try {
      const response = await DELETE(id);
      if (response.status === 200) {
        // Kommentar erfolgreich gelöscht, hole die aktuellen Kommentare
        fetchComments();
      } else {
        console.error("Fehler beim Löschen des Kommentars");
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Kommentars:", error);
    }
  };

  return (
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

        <form onSubmit={handleSubmit} style={formStyle}>
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
            comments.map((commentData) => (
              <div key={commentData.id} style={commentStyle}>
                <p>{commentData.comment}</p>
                <button
                  onClick={() => handleDelete(commentData.id)}
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
  );
}

// Styles (bleiben unverändert)

// Beispiel für den Delete-Button-Style
const deleteButtonStyle = {
  backgroundColor: "#ff6347", // Rote Farbe für den Löschen-Button
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};
