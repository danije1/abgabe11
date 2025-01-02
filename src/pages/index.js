import Image from "next/image";
import { Roboto } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          <Image
            src="/image/logo_sw.gif" // Ersetze mit deinem animierten Logo
            alt="Switch AI Logo"
            width={150}
            height={70}
          />
          <h1 style={h1Style}>switch.ai</h1>
        </div>
        <nav style={navStyle}>
          <a href="#about" style={linkStyle}>
            About
          </a>
          <a href="#services" style={linkStyle}>
            Services
          </a>
          <Link href="/feedback">
            <span style={linkStyle}>Contact</span> {/* Ändere a zu span */}
          </Link>
        </nav>
      </header>

      <section style={heroStyle}>
        <div style={heroContentStyle}>
          <h2>Grün beginnt Zuhause.</h2>
        </div>
      </section>

      <footer style={footerStyle}>
        <p>&copy; switch.ai All rights reserved.</p>
      </footer>
    </>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#0070f3",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Passe die Schriftstärken an
});

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

const heroContentStyle = {
  backgroundColor: "rgba(142, 128, 128, 0.6)", // Halbtransparenter Hintergrund für Lesbarkeit
  padding: "1rem",
  borderRadius: "20px",
  textAlign: "center",
  fontSize: "70px",
  fontFamily: roboto.style.fontFamily,
};

const footerStyle = {
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "#203a43",
  color: "#fff",
  marginTop: "2rem",
};
