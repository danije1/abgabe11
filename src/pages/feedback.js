import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Feedback() {
  // Zustände für den Namen, Kommentar und Sternebewertung
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  // Funktion zum Hinzufügen eines Kommentars
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim() && rating > 0) {
      // Kommentar, Name und Bewertung speichern
      setComments([{ name, comment, rating, id: Date.now() }, ...comments]);
      setName(''); // Name zurücksetzen
      setComment(''); // Kommentar zurücksetzen
      setRating(0); // Bewertung zurücksetzen
    }
  };

  return (
    <>
      <div style={pageStyle}>
        <header style={headerStyle}>
          <div style={logoContainerStyle}>
            <Link href="/" style={logoLinkStyle}>
              <Image
                src="/image/logo_sw.gif" // Ersetze mit deinem animierten Logo
                alt="Switch AI Logo"
                width={150}
                height={70}
              />
            </Link>
            <Link href="/" style={h1Style}> {/* Klickbarer "switch.ai" Text */}
              switch.ai
            </Link>
          </div>
          <nav style={navStyle}>
            <a href="#about" style={linkStyle}>About</a>
            <a href="#services" style={linkStyle}>Services</a>
            <Link href="/feedback" style={linkStyle}>
              Contact
            </Link>
          </nav>
        </header>

        <div style={containerStyle}>
          <h1 style={headerStyleFeedback}>Feedback</h1>

          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dein Name"
              style={inputStyle}
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Schreibe deinen Kommentar hier..."
              rows="4"
              style={textareaStyle}
            />
            <div style={ratingStyle}>
              <span>Bewertung:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    ...starStyle,
                    backgroundColor: star <= rating ? '#FFD700' : '#ccc',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <button type="submit" style={buttonStyle}>
              Absenden
            </button>
          </form>

          <h2 style={commentsHeaderStyle}>Kommentare:</h2>
          <div style={commentsContainerStyle}>
            {comments.length > 0 ? (
              comments.map((commentData) => (
                <div key={commentData.id} style={commentStyle}>
                  <div style={commentHeaderStyle}>
                    <strong>{commentData.name}</strong> - {commentData.rating} Sterne
                  </div>
                  <p>{commentData.comment}</p>
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
  backgroundColor: '#0f1c25', // Dunkelblau für die gesamte Seite
  minHeight: '100vh', // Stellt sicher, dass der Hintergrund die gesamte Seite abdeckt
  color: '#E0E0E0', // Helle Schriftfarbe
  margin: 0,
  fontFamily: "'Arial', sans-serif",
};

const headerStyle = {
  background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
  color: '#fff',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const logoLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const h1Style = {
  margin: 0,
  fontSize: '1.8rem',
  textDecoration: 'none', // Verhindert Unterstreichung
  color: '#fff',
  cursor: 'pointer',
};

const navStyle = {
  display: 'flex',
  gap: '1rem',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
};

const containerStyle = {
  padding: '40px',
  maxWidth: '700px',
  margin: 'auto',
  backgroundColor: '#1A2530', // Dunkelblau für den Hintergrund
  color: '#E0E0E0', // Helle Schriftfarbe
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const headerStyleFeedback = {
  fontSize: '2.5rem',
  fontWeight: '600',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#00D9F1', // Futuristisches Cyan für den Header
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '30px',
};

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #333',
  backgroundColor: '#2A3842', // Dunkleres Blau für Input
  color: '#E0E0E0', // Helle Schrift
};

const textareaStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #333',
  backgroundColor: '#2A3842', // Dunkleres Blau für Textarea
  color: '#E0E0E0', // Helle Schrift
  resize: 'none',
};

const ratingStyle = {
  display: 'flex',
  gap: '5px',
  marginTop: '10px',
};

const starStyle = {
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#00D9F1', // Cyan für den Button
  color: '#1A2530',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const commentsHeaderStyle = {
  fontSize: '1.8rem',
  fontWeight: '500',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#00D9F1', // Futuristisches Cyan für Kommentare
};

const commentsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const commentStyle = {
  backgroundColor: '#2A3842',
  padding: '15px',
  borderRadius: '8px',
  color: '#E0E0E0',
  fontSize: '16px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
};

const commentHeaderStyle = {
  fontWeight: 'bold',
  marginBottom: '10px',
};

const noCommentsStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#C0C0C0',
};
